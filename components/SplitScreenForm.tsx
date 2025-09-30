"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { themes } from "../templates/themes";
import { fillTemplate } from "../templates/templateFiller";
import dynamic from "next/dynamic";

const MarkdownPreview = dynamic(() => import("@/components/MarkdownPreview"), { ssr: false });

interface SplitScreenFormProps {
  themeId: string;
  onBack: () => void;
}

export default function SplitScreenForm({ themeId, onBack }: SplitScreenFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<any>({});
  const [copied, setCopied] = useState(false);
  
  // Find the selected theme
  const selectedTheme = themes.find((theme: any) => theme.id === themeId);
  
  if (!selectedTheme) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Theme not found</h2>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Initialize form data with theme presets and localStorage
  useEffect(() => {
    const initialData: any = {};
    
    // Load existing data from localStorage first
    const savedData = localStorage.getItem('formData');
    let existingData: any = {};
    if (savedData) {
      try {
        existingData = JSON.parse(savedData);
      } catch (error) {
        console.error('Error parsing saved form data:', error);
      }
    }
    
    // Only show sections that are in the theme's order (what the theme actually uses)
    const themeSections = selectedTheme.order || [];
    
    if (selectedTheme.formMeta?.sections) {
      selectedTheme.formMeta.sections.forEach((section: any) => {
        // Only include sections that are in the theme's order
        if (themeSections.includes(section.id)) {
          section.fields.forEach((field: any) => {
            const sectionId = section.id;
            if (!initialData[sectionId]) {
              initialData[sectionId] = {};
            }
            
            // Priority: existing localStorage data > theme presets > defaults
            const existingValue = existingData[sectionId]?.[field.id];
            if (existingValue !== undefined && existingValue !== '') {
              initialData[sectionId][field.id] = existingValue;
            } else {
              // Use preset values if available
              const presetValue = (selectedTheme.presets as any)[sectionId];
              if (presetValue && typeof presetValue === 'object' && presetValue[field.id]) {
                initialData[sectionId][field.id] = presetValue[field.id];
              } else if (presetValue && typeof presetValue === 'string' && field.id === 'content') {
                initialData[sectionId][field.id] = presetValue;
              } else if (field.type === 'checkbox') {
                initialData[sectionId][field.id] = (field as any).defaultValue || false;
              } else if (field.type === 'multiselect') {
                initialData[sectionId][field.id] = [];
              } else {
                initialData[sectionId][field.id] = '';
              }
            }
          });
        }
      });
    }
    
    setFormData(initialData);
  }, [selectedTheme]);

  const handleFieldChange = (sectionId: string, fieldId: string, value: any) => {
    const newFormData = {
      ...formData,
      [sectionId]: {
        ...formData[sectionId],
        [fieldId]: value
      }
    };
    setFormData(newFormData);
    
    // Save to localStorage
    localStorage.setItem('formData', JSON.stringify(newFormData));
  };

  // Convert our form data to the expected FormData structure
  const convertToFormData = (data: any) => {
    return {
      hero: {
        name: data.hero?.name || "",
        tagline: data.hero?.tagline || "",
        name_encoded: encodeURIComponent(data.hero?.name || "")
      },
      about: data.about?.content || "",
      stack: data.stack?.technologies || [],
      hobbies: data.hobbies?.content || "",
      stats: {
        showStats: data.stats?.showStats || false,
        showTrophies: data.stats?.showTrophies || false,
        github_username: data.stats?.github_username || ""
      },
      socials: {
        github: data.socials?.github || "",
        twitter: data.socials?.twitter || "",
        linkedin: data.socials?.linkedin || "",
        website: data.socials?.website || "",
        instagram: data.socials?.instagram || ""
      },
      quote: data.end_quote?.content || "",
      end_quote: {
        content: data.end_quote?.content || ""
      },
      custom_md: data.custom_md?.content || ""
    };
  };

  const handleCopy = async () => {
    try {
      const convertedData = convertToFormData(formData);
      const markdown = fillTemplate(selectedTheme.markdownTemplate, convertedData, selectedTheme);
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const renderField = (section: any, field: any) => {
    const sectionId = section.id;
    const value = formData[sectionId]?.[field.id] || '';

    switch (field.type) {
      case 'text':
      case 'url':
        return (
          <div key={field.id} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type={field.type}
              placeholder={field.placeholder}
              value={value}
              onChange={(e) => handleFieldChange(sectionId, field.id, e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-400 focus:outline-none transition-all duration-200"
              maxLength={(field as any).maxLength}
            />
          </div>
        );

      case 'textarea':
        return (
          <div key={field.id} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <textarea
              placeholder={field.placeholder}
              value={value}
              onChange={(e) => handleFieldChange(sectionId, field.id, e.target.value)}
              rows={field.rows || 4}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-400 focus:outline-none transition-all duration-200 resize-none"
              maxLength={(field as any).maxLength}
            />
            {(field as any).maxLength && (
              <p className="text-xs text-gray-500 text-right">
                {value.length}/{(field as any).maxLength}
              </p>
            )}
          </div>
        );

      case 'checkbox':
        return (
          <div key={field.id} className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => handleFieldChange(sectionId, field.id, e.target.checked)}
              className="w-5 h-5 text-gray-900 border-gray-300 rounded focus:ring-gray-500"
            />
            <label className="text-sm font-medium text-gray-700">
              {field.label}
            </label>
          </div>
        );

      case 'multiselect':
        return (
          <div key={field.id} className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-40 overflow-y-auto">
              {field.options?.map((option: string) => {
                const isSelected = Array.isArray(value) && value.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      const currentValues = Array.isArray(value) ? value : [];
                      const newValues = isSelected
                        ? currentValues.filter((v) => v !== option)
                        : [...currentValues, option];
                      handleFieldChange(sectionId, field.id, newValues);
                    }}
                    className={`px-3 py-2 text-sm rounded-lg border transition-all duration-200 capitalize ${
                      isSelected
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Generate live preview markdown
  const liveMarkdown = (() => {
    try {
      const convertedData = convertToFormData(formData);
      return fillTemplate(selectedTheme.markdownTemplate, convertedData, selectedTheme);
    } catch (error) {
      console.error('Error generating preview:', error);
      return "# Loading preview...\n\nPlease fill in the form fields to see your README preview.";
    }
  })();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 px-8 py-5 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-6">
          <motion.button
            onClick={onBack}
            className="flex items-center space-x-2 px-4 py-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-200 border border-gray-200/60"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Back</span>
          </motion.button>
          <div className="border-l border-gray-200 pl-6">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{selectedTheme.name}</h1>
            <p className="text-sm text-gray-500 font-medium">Customize your GitHub profile</p>
          </div>
        </div>
        
        <motion.button
          onClick={handleCopy}
          className={`flex items-center space-x-3 px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-sm ${
            copied
              ? 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100'
              : 'bg-gray-900 hover:bg-gray-800 text-white border border-gray-800 hover:shadow-md'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Copied to Clipboard!' : 'Copy README'}</span>
        </motion.button>
      </header>

      {/* Split Screen Content */}
      <div className="max-w-7xl mx-auto h-[calc(100vh-80px)] flex">
        {/* Left Side - Form */}
        <div className="w-1/2 p-8 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="max-w-lg mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">Customize Your README</h2>
              <p className="text-gray-600">Fill in the details to generate your personalized README</p>
            </div>

            {selectedTheme.formMeta?.sections?.filter((section: any) => 
              (selectedTheme.order || []).includes(section.id)
            ).map((section: any) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-6"
              >
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                  <p className="text-sm text-gray-600">{section.description}</p>
                </div>
                
                <div className="space-y-4">
                  {section.fields.map((field: any) => renderField(section, field))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side - Live Preview */}
        <div className="w-1/2 border-l border-gray-200 bg-white">
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
              <p className="text-sm text-gray-600">See your README update in real-time</p>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="prose prose-sm max-w-none">
                <MarkdownPreview markdown={liveMarkdown} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
