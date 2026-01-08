export interface ArticleDetail {
  id: number
  title: string
  description: string
  icon: string
  content: {
    introduction: string
    sections: {
      title: string
      content: string
      points?: string[]
    }[]
    references: string[]
  }
}

export const articlesData: ArticleDetail[] = [
  {
    id: 1,
    title: "Stress & Emotional Well-being",
    description: "Understanding how stress affects emotions and how to manage it in daily life.",
    icon: "stress.png",
    content: {
      introduction: "Stress is a natural psychological response to challenging or demanding situations. In moderate levels, stress can support motivation and performance. However, prolonged or unmanaged stress may negatively affect emotional well-being and daily functioning.",
      sections: [
        {
          title: "Key Insights from Research",
          content: "",
          points: [
            "Chronic stress is linked to emotional exhaustion and anxiety",
            "Emotional regulation plays an important role in managing stress",
            "Healthy coping strategies reduce long-term emotional strain"
          ]
        },
        {
          title: "Practical Reflection",
          content: "Becoming aware of stress responses helps individuals recognize emotional needs. Simple strategies such as relaxation, balanced routines, and social support can contribute to emotional balance."
        }
      ],
      references: [
        "Lazarus, R. S., & Folkman, S. (1984). Stress, appraisal, and coping. Springer."
      ]
    }
  },
  {
    id: 2,
    title: "Emotional Intelligence Skills",
    description: "Learn how emotional intelligence helps build healthier coping strategies.",
    icon: "emotionall.png",
    content: {
      introduction: "Emotional intelligence refers to the ability to recognize, understand, and manage emotions in oneself and others. Research suggests that emotional intelligence supports healthier coping strategies and emotional resilience.",
      sections: [
        {
          title: "Key Insights from Research",
          content: "",
          points: [
            "Emotional awareness improves stress management",
            "Emotion regulation supports emotional stability",
            "Empathy strengthens interpersonal relationships"
          ]
        },
        {
          title: "Practical Reflection",
          content: "Developing emotional intelligence can improve communication, emotional balance, and daily interactions."
        }
      ],
      references: [
        "Salovey, P., & Mayer, I. D. (1990). Emotional intelligence. Imagination, Cognition and Personality, 9(3), 185-211."
      ]
    }
  },
  {
    id: 3,
    title: "Building Psychological Resilience",
    description: "Discover how to strengthen resilience during challenging life situations.",
    icon: "resilence.png",
    content: {
      introduction: "Psychological resilience refers to the ability to adapt positively when facing stress or adversity. Research highlights that resilience can be developed through experience and supportive environments.",
      sections: [
        {
          title: "Key Insights from Research",
          content: "",
          points: [
            "Resilience supports emotional recovery",
            "Social support strengthens coping capacity",
            "Emotional regulation enhances resilience"
          ]
        },
        {
          title: "Practical Reflection",
          content: "Building resilience involves learning from experiences, maintaining social connections, and practicing emotional awareness."
        }
      ],
      references: [
        "Southwick, S. M., et al. (2014). Resilience definitions, theory, and challenges. European Journal of Psychotraumatology, 5(1)."
      ]
    }
  },
  {
    id: 4,
    title: "Anxiety and Emotional Awareness",
    description: "Understanding anxiety and the importance of recognizing emotional signals.",
    icon: "anxiety.png",
    content: {
      introduction: "Anxiety is a common emotional response to uncertainty or perceived threats. Emotional awareness plays an important role in managing anxious thoughts.",
      sections: [
        {
          title: "Key Insights from Research",
          content: "",
          points: [
            "Emotional awareness reduces anxiety intensity",
            "Identifying emotional triggers supports coping",
            "Social support enhances emotional regulation"
          ]
        },
        {
          title: "Practical Reflection",
          content: "Understanding emotional responses allows individuals to respond to anxiety in healthier ways."
        }
      ],
      references: [
        "Barlow, D. H. (2002). Anxiety and its disorders. Guilford Press."
      ]
    }
  },
  {
    id: 5,
    title: "Coping with Academic Stress",
    description: "Effective strategies to manage academic pressure and maintain mental balance.",
    icon: "academic.png",
    content: {
      introduction: "Academic stress is commonly experienced by students due to academic demands, performance expectations, and time pressure. If unmanaged, academic stress may affect emotional well-being.",
      sections: [
        {
          title: "Key Insights from Research",
          content: "",
          points: [
            "Academic stress impacts emotional health",
            "Time management reduces stress levels",
            "Emotional support improves academic adjustment"
          ]
        },
        {
          title: "Practical Reflection",
          content: "Healthy coping strategies help students maintain balance throughout their academic journey."
        }
      ],
      references: [
        "Pascoe, M. C., et al. (2020). The impact of stress on students. International Journal of Adolescence and Youth, 25(1)."
      ]
    }
  },
  {
    id: 6,
    title: "The Role of Social Support in Mental Health",
    description: "How social connections contribute to emotional well-being.",
    icon: "social.png",
    content: {
      introduction: "Social support is an essential protective factor in maintaining mental health. Research shows that social connections help reduce stress and emotional distress.",
      sections: [
        {
          title: "Key Insights from Research",
          content: "",
          points: [
            "Social support buffers stress",
            "Emotional support improves coping",
            "Belonging enhances emotional well-being"
          ]
        },
        {
          title: "Practical Reflection",
          content: "Maintaining healthy relationships can support emotional stability and resilience."
        }
      ],
      references: [
        "Cohen, S., & Wills, T. A. (1985). Stress, social support, and the buffering hypothesis. Psychological Bulletin, 98(2)."
      ]
    }
  },
  {
    id: 7,
    title: "Mindfulness and Emotional Regulation",
    description: "Using mindfulness to improve emotional balance and awareness.",
    icon: "mindfulness.png",
    content: {
      introduction: "Mindfulness involves paying attention to the present moment without judgment. Research indicates that mindfulness practices support emotional regulation and stress reduction.",
      sections: [
        {
          title: "Key Insights from Research",
          content: "",
          points: [
            "Mindfulness enhances emotional awareness",
            "Regular practice improves emotional regulation",
            "Mindfulness reduces stress-related symptoms"
          ]
        },
        {
          title: "Practical Reflection",
          content: "Practicing mindfulness helps individuals respond calmly to emotional challenges."
        }
      ],
      references: [
        "Kabat-Zinn, J. (2003). Mindfulness-based interventions in context. Clinical Psychology: Science and Practice, 10(2)."
      ]
    }
  },
  {
    id: 8,
    title: "Self-Care and Psychological Well-being",
    description: "The importance of daily self-care for maintaining mental health.",
    icon: "selfcare.png",
    content: {
      introduction: "Self-care includes intentional activities that support emotional and psychological well-being. Research emphasizes its importance in maintaining mental health.",
      sections: [
        {
          title: "Key Insights from Research",
          content: "",
          points: [
            "Self-care reduces emotional strain",
            "Balanced routines improve well-being",
            "Consistent self-care supports resilience"
          ]
        },
        {
          title: "Practical Reflection",
          content: "Daily self-care practices help maintain emotional balance and long-term well-being."
        }
      ],
      references: [
        "World Health Organization. (2013). Mental health action plan 2013-2020."
      ]
    }
  },
  {
    id: 9,
    title: "Sleep & Mental Well-being",
    description: "Understanding the relationship between sleep and emotional health.",
    icon: "sleep.png",
    content: {
      introduction: "Sleep plays a vital role in maintaining mental and emotional well-being. Research shows that adequate sleep supports emotional regulation, cognitive functioning, and overall psychological balance. Insufficient or poor-quality sleep may increase emotional sensitivity and stress levels.",
      sections: [
        {
          title: "Key Insights from Research",
          content: "",
          points: [
            "Sleep affects emotional regulation and mood stability",
            "Poor sleep quality is associated with increased stress and emotional fatigue",
            "Consistent sleep routines support mental well-being"
          ]
        },
        {
          title: "Practical Reflection",
          content: "Maintaining healthy sleep habits, such as regular sleep schedules and limiting screen exposure before bedtime, can contribute to better emotional balance and daily functioning."
        }
      ],
      references: [
        "Harvey, A. G. (2008). Insomnia, psychiatric disorders, and the transdiagnostic perspective. Current Directions in Psychological Science, 17(5), 299-303."
      ]
    }
  }
]
