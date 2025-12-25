import { Button } from "@/components/ui/button"

export default function ExploreFeatures() {
  const features = [
    {
      id: "talk-to-us",
      title: "Talk to us",
      description: `Connect directly with licensed psychologists through a secure chat feature. Before starting a consultation, users are guided to complete a mental health record to help psychologists understand your concerns more accurately and responsibly.`,
      icon: "/images/talk.png",
    },
    {
      id: "get-to-know-you",
      title: "Get to Know You",
      description: `This brief form helps us get to know you better, so our psychologists can provide more personalized and supportive conversations.`,
      icon: "/images/get.png",
    },
    {
      id: "mental-health-articles",
      title: "Mental Health Articles",
      description: `Access curated, evidence-based articles from trusted psychological journals covering topics such as stress management, emotional regulation, anxiety, and self-care.`,
      icon: "/images/mental.png",
    },
  ]

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">Explore Our Features</h2>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature) => (
          <div key={feature.id} className="text-center bg-gray-300/80 rounded-lg p-8">
            <div className="w-32 h-32 mx-auto mb-6 flex items-center justify-center">
              <img
                src={feature.icon || "/placeholder.svg"}
                alt={`${feature.title} icon`}
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
            <p className="text-gray-700 leading-relaxed mb-6 text-sm">{feature.description}</p>
            <Button className="bg-[#1a2e4a] hover:bg-[#0f1f31] text-white px-6 py-2 rounded-full">
              {feature.title}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
