"use client"

import { ArticleDetail } from "@/lib/articlesData"
import { useState } from "react"

interface ArticleModalProps {
  article: ArticleDetail
  isOpen: boolean
  onClose: () => void
}

export function ArticleModal({ article, isOpen, onClose }: ArticleModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header dengan tombol close */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-center rounded-t-3xl">
          <h1 className="text-3xl font-bold text-gray-900">{article.title}</h1>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-3xl font-light leading-none transition-colors"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-8">
          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              {article.content.introduction}
            </p>
          </section>

          {/* Sections */}
          {article.content.sections.map((section, index) => (
            <section key={index} className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {section.title}
              </h2>
              
              {section.points && section.points.length > 0 ? (
                <ul className="space-y-2 mb-4">
                  {section.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="text-gray-700 leading-relaxed flex items-start">
                      <span className="text-gray-900 font-semibold mr-3">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
              
              {section.content && (
                <p className="text-gray-700 leading-relaxed">
                  {section.content}
                </p>
              )}
            </section>
          ))}

          {/* References */}
          {article.content.references.length > 0 && (
            <section className="mt-8 pt-6 border-t border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">References</h2>
              <div className="bg-blue-50 rounded-xl p-4">
                {article.content.references.map((ref, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed text-sm">
                    {ref}
                  </p>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Footer disclaimer */}
        <div className="border-t border-gray-200 px-8 py-6 text-center text-gray-600 text-sm bg-gray-50 rounded-b-3xl">
          <p>
            This article is intended for educational purposes only and does not replace professional psychological
            diagnosis or treatment.
          </p>
        </div>
      </div>
    </div>
  )
}
