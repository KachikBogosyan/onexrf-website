"use client";

/**
 * The subset of HubSpot's jQuery-like form handle this component uses.
 * HubSpot ships no types, so this is declared narrowly rather than as `any`.
 */
type HubSpotFormField = {
  length: number;
  val: (value: string) => void;
};

type HubSpotFormHandle = {
  find: (selector: string) => HubSpotFormField;
};

import { useState, useEffect } from "react";
import Script from "next/script";

type Context = {
  type: "product" | "application" | "material" | "tooling" | "support" | "technology" | null;
  name: string;
  slug?: string;
} | null;

type Props = {
  context: Context;
};

// HubSpot Portal ID - should be set as environment variable
// For now, using a placeholder that you'll need to replace
const HUBSPOT_PORTAL_ID = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID || "";
const HUBSPOT_FORM_ID = process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID || "";

export function HubSpotForm({ context }: Props) {
  const [formLoaded, setFormLoaded] = useState(false);
  const [formError, setFormError] = useState(false);

  useEffect(() => {
    // Check if form has loaded
    const checkFormLoaded = () => {
      const formContainer = document.querySelector("#hubspot-form-container");
      if (formContainer && formContainer.children.length > 0) {
        setFormLoaded(true);
      }
    };

    // Poll for form load (HubSpot forms load asynchronously)
    const interval = setInterval(checkFormLoaded, 500);
    const timeout = setTimeout(() => {
      clearInterval(interval);
      if (!formLoaded) {
        setFormError(true);
      }
    }, 10000); // 10 second timeout

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [formLoaded]);

  // If no HubSpot Portal ID is configured, show a fallback form
  if (!HUBSPOT_PORTAL_ID || !HUBSPOT_FORM_ID) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
        <p className="text-sm text-slate-600 mb-4">
          <strong>Note:</strong> HubSpot form is not configured. Please set the
          following environment variables:
        </p>
        <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside mb-4">
          <li>
            <code>NEXT_PUBLIC_HUBSPOT_PORTAL_ID</code>
          </li>
          <li>
            <code>NEXT_PUBLIC_HUBSPOT_FORM_ID</code>
          </li>
        </ul>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Name *
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-slate-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-slate-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Company
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-slate-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Message *
            </label>
            <textarea
              rows={5}
              className="w-full px-3 py-2 border border-slate-300 rounded-md"
              defaultValue={
                context
                  ? `I'm interested in learning more about ${context.name}.`
                  : ""
              }
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              alert(
                "Form submission not configured. Please set up HubSpot form or contact form handler."
              );
            }}
          >
            Send Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* HubSpot Tracking Script */}
      <Script
        strategy="lazyOnload"
        src="https://js.hsforms.net/forms/v2.js"
        onLoad={() => {
          if (window.hbspt) {
            try {
              window.hbspt.forms.create({
                portalId: HUBSPOT_PORTAL_ID,
                formId: HUBSPOT_FORM_ID,
                target: `#hubspot-form-container`,
                // Pre-fill fields if context is available
                onFormReady: ($form: HubSpotFormHandle) => {
                  if (context) {
                    // Pre-fill message field with context
                    const messageField = $form.find('textarea[name="message"]');
                    if (messageField.length) {
                      messageField.val(
                        `I'm interested in learning more about ${context.name}.`
                      );
                    }

                    // Pre-fill subject or other fields based on context type
                    const subjectField = $form.find('input[name="subject"]');
                    if (subjectField.length) {
                      subjectField.val(`Inquiry about ${context.name}`);
                    }

                    // You can add more field pre-filling here based on your HubSpot form fields
                    // Common field names: firstname, lastname, email, company, phone, etc.
                  }
                },
                onFormSubmit: () => {
                  // Optional: Track form submission
                  setFormLoaded(true);
                },
              });
            } catch (error) {
              console.error("Error loading HubSpot form:", error);
              setFormError(true);
            }
          }
        }}
        onError={() => {
          setFormError(true);
        }}
      />

      {/* Form Container */}
      <div id="hubspot-form-container" className="min-h-[400px]">
        {!formLoaded && !formError && (
          <div className="flex items-center justify-center py-12">
            <p className="text-sm text-slate-600">Loading form...</p>
          </div>
        )}
        {formError && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              There was an error loading the form. Please{" "}
              <a
                href="mailto:info@onexrf.com"
                className="text-blue-600 hover:underline font-medium"
              >
                contact us directly via email
              </a>
              .
            </p>
          </div>
        )}
      </div>
    </>
  );
}

// Extend Window interface for HubSpot
declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (options: {
          portalId: string;
          formId: string;
          target: string;
          onFormReady?: ($form: HubSpotFormHandle) => void;
          onFormSubmit?: () => void;
        }) => void;
      };
    };
  }
}

