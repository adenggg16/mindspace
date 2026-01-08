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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-3 md:p-4">
      <div className="bg-white rounded-2xl md:rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header dengan tombol close */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 md:px-8 py-4 md:py-6 flex justify-between items-center rounded-t-2xl md:rounded-t-3xl gap-4">
          <h1 className="text-xl md:text-3xl font-bold text-gray-900 line-clamp-2">{article.title}</h1>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl md:text-3xl font-light leading-none transition-colors flex-shrink-0"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="px-4 md:px-8 py-6 md:py-8">
          {/* Introduction */}
          <section className="mb-6 md:mb-8">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">Introduction</h2>
            <p className="text-gray-700 leading-relaxed text-sm md:text-base">
              {article.content.introduction}
            </p>
          </section>

          {/* Sections */}
          {article.content.sections.map((section, index) => (
            <section key={index} className="mb-6 md:mb-8">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">
                {section.title}
              </h2>
              
              {section.points && section.points.length > 0 ? (
                <ul className="space-y-2 mb-4">
                  {section.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="text-gray-700 leading-relaxed flex items-start text-sm md:text-base">
                      <span className="text-gray-900 font-semibold mr-3 flex-shrink-0">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
              
              {section.content && (
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                  {section.content}
                </p>
              )}
            </section>
          ))}

          {/* References */}
          {article.content.references.length > 0 && (
            <section className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-200">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">References</h2>
              <div className="bg-blue-50 rounded-lg md:rounded-xl p-3 md:p-4">
                {article.content.references.map((ref, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed text-xs md:text-sm">
                    {ref}
                  </p>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Footer disclaimer */}
        <div className="border-t border-gray-200 px-4 md:px-8 py-4 md:py-6 text-center text-gray-600 text-xs md:text-sm bg-gray-50 rounded-b-2xl md:rounded-b-3xl">
          <p>
            This article is intended for educational purposes only and does not replace professional psychological
            diagnosis or treatment.
          </p>
        </div>
      </div>
    </div>
  )
}
