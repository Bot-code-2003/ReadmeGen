"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { themes } from "../templates/themes";
import { fillTemplate } from "../templates/templateFiller";
import dynamic from "next/dynamic";

const MarkdownPreview = dynamic(() => import("@/components/MarkdownPreview"), { ssr: false });

interface FormField {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  rows?: number;
  options?: string[];
  defaultValue?: boolean;
}

interface FormSection {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
}

interface Theme {
  id: string;
  name: string;
  markdownTemplate: string;
  order?: string[];
  presets?: Record<string, unknown>;
  formMeta?: {
    sections?: FormSection[];
  };
}

interface SplitScreenFormProps {
  themeId: string;
  onBack: () => void;
}

type FormDataState = Record<string, Record<string, unknown>>;

export default function SplitScreenForm({ themeId, onBack }: SplitScreenFormProps) {
  const [formData, setFormData] = useState<FormDataState>({});
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Find the selected theme
  const selectedTheme = themes.find((theme: Theme) => theme.id === themeId);
  
  // Initialize form data with theme presets and localStorage
  useEffect(() => {
    if (!selectedTheme) {
      setIsLoading(false);
      return;
    }
    
    const initializeFormData = () => {
      const initialData: FormDataState = {};
      
      // Load existing data from localStorage first
      const savedData = localStorage.getItem('formData');
      let existingData: FormDataState = {};
      if (savedData) {
        try {
          existingData = JSON.parse(savedData) as FormDataState;
        } catch (error) {
          console.error('Error parsing saved form data:', error);
        }
      }
      
      // Only show sections that are in the theme's order (what the theme actually uses)
      const themeSections = selectedTheme.order || [];
      
      if (selectedTheme.formMeta?.sections) {
        selectedTheme.formMeta.sections.forEach((section: FormSection) => {
          // Only include sections that are in the theme's order
          if (themeSections.includes(section.id)) {
            section.fields.forEach((field: FormField) => {
              const sectionId = section.id;
              if (!initialData[sectionId]) {
                initialData[sectionId] = {};
              }
              
              // Priority: existing localStorage data > theme presets > defaults
              const existingValue = existingData[sectionId]?.[field.id];
              if (existingValue !== undefined && existingValue !== '') {
                initialData[sectionId][field.id] = existingValue;
              } else if (selectedTheme.presets?.[sectionId]) {
                // Use preset values if available
                const presetValue = selectedTheme.presets[sectionId];
                if (typeof presetValue === 'object' && presetValue && field.id in (presetValue as Record<string, unknown>)) {
                  initialData[sectionId][field.id] = (presetValue as Record<string, unknown>)[field.id];
                } else if (typeof presetValue === 'string' && field.id === 'content') {
                  initialData[sectionId][field.id] = presetValue;
                } else if (field.type === 'checkbox') {
                  initialData[sectionId][field.id] = field.defaultValue ?? false;
                } else if (field.type === 'multiselect') {
                  initialData[sectionId][field.id] = [];
                } else {
                  initialData[sectionId][field.id] = '';
                }
              } else if (field.type === 'checkbox') {
                initialData[sectionId][field.id] = field.defaultValue ?? false;
              } else if (field.type === 'multiselect') {
                initialData[sectionId][field.id] = [];
              } else {
                initialData[sectionId][field.id] = '';
              }
            });
          }
        });
      }
      
      setFormData(initialData);
      setIsLoading(false);
    };
    
    initializeFormData();
  }, [selectedTheme]);

  const handleFieldChange = (sectionId: string, fieldId: string, value: unknown) => {
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
  interface FormattedFormData {
    hero: {
      name: string;
      tagline: string;
      name_encoded: string;
    };
    about: string;
    stack: string[];
    hobbies: string;
    stats: {
      showStats: boolean;
      showTrophies: boolean;
      github_username: string;
    };
    socials: {
      github: string;
      twitter: string;
      linkedin: string;
      website: string;
      instagram: string;
    };
    quote: string;
    end_quote: {
      content: string;
    };
    custom_md: string;
  }

  const convertToFormData = (data: FormDataState): FormattedFormData => ({
    hero: {
      name: (data.hero?.name as string) || "",
      tagline: (data.hero?.tagline as string) || "",
      name_encoded: encodeURIComponent((data.hero?.name as string) || "")
    },
    about: (data.about?.content as string) || "",
    stack: (data.stack?.technologies as string[]) || [],
    hobbies: (data.hobbies?.content as string) || "",
    stats: {
      showStats: (data.stats?.showStats as boolean) || false,
      showTrophies: (data.stats?.showTrophies as boolean) || false,
      github_username: (data.stats?.github_username as string) || ""
    },
    socials: {
      github: (data.socials?.github as string) || "",
      twitter: (data.socials?.twitter as string) || "",
      linkedin: (data.socials?.linkedin as string) || "",
      website: (data.socials?.website as string) || "",
      instagram: (data.socials?.instagram as string) || ""
    },
    quote: (data.end_quote?.content as string) || "",
    end_quote: {
      content: (data.end_quote?.content as string) || ""
    },
    custom_md: (data.custom_md?.content as string) || ""
  });

  const handleCopy = async () => {
    if (!selectedTheme) return;
    
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

  const renderField = (section: FormSection, field: FormField) => {
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
              value={String(value || '')}
              onChange={(e) => handleFieldChange(sectionId, field.id, e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-400 focus:outline-none transition-all duration-200"
              maxLength={field.maxLength}
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
              value={String(value || '')}
              onChange={(e) => handleFieldChange(sectionId, field.id, e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-400 focus:outline-none transition-all duration-200 min-h-[120px]"
              rows={field.rows || 4}
              maxLength={field.maxLength}
            />
          </div>
        );
      case 'checkbox':
        return (
          <div key={field.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={`${sectionId}-${field.id}`}
              checked={Boolean(value)}
              onChange={(e) => handleFieldChange(sectionId, field.id, e.target.checked)}
              className="h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded"
            />
            <label htmlFor={`${sectionId}-${field.id}`} className="text-sm text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
          </div>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!selectedTheme) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Theme not found</h2>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
            type="button"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            type="button"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to themes</span>
          </button>
          
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-gray-900">{selectedTheme.name} Editor</h1>
          </div>
          
          <button
            onClick={handleCopy}
            disabled={copied}
            type="button"
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              copied
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-900 text-white hover:bg-gray-800'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-5 h-5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                <span>Copy README</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Form Section */}
        <div className="w-1/2 p-6 overflow-y-auto">
          <div className="max-w-2xl mx-auto space-y-8">
            {selectedTheme.formMeta?.sections?.map((section) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              >
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  {section.title}
                </h2>
                <p className="text-sm text-gray-500 mb-6">{section.description}</p>
                
                <div className="space-y-6">
                  {section.fields.map((field) => renderField(section, field))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Preview Section */}
        <div className="w-1/2 bg-gray-50 border-l border-gray-200 p-6 overflow-y-auto">
          <div className="sticky top-0 bg-gray-50 py-4 mb-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Live Preview</h2>
          </div>
          
          <div className="prose max-w-none">
            <MarkdownPreview 
              content={fillTemplate(
                selectedTheme.markdownTemplate, 
                convertToFormData(formData), 
                selectedTheme
              )} 
            />
          </div>
        </div>
      </main>
    </div>
  );
}
