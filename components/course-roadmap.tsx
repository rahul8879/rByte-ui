import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, ArrowRight } from "lucide-react"

export default function CourseRoadmap() {
  const roadmapSteps = [
    {
      month: "Month 1-2",
      title: "Foundation Building",
      description: "Master Python programming and essential libraries for AI development",
      skills: [
        "Advanced Python Programming",
        "Data Manipulation with Pandas & NumPy",
        "Scientific Computing with SciPy",
        "Data Visualization",
        "Version Control & Software Engineering Practices",
      ],
    },
    {
      month: "Month 2-3",
      title: "Machine Learning Fundamentals",
      description: "Learn core ML algorithms and techniques for data analysis",
      skills: [
        "Supervised & Unsupervised Learning",
        "Feature Engineering",
        "Model Evaluation & Validation",
        "Ensemble Methods",
        "ML Project Pipeline Development",
      ],
    },
    {
      month: "Month 3-4",
      title: "Deep Learning & Neural Networks",
      description: "Dive into neural network architectures and frameworks",
      skills: [
        "Neural Network Fundamentals",
        "TensorFlow & PyTorch",
        "CNN, RNN, LSTM Architectures",
        "Transfer Learning",
        "Model Deployment & Optimization",
      ],
    },
    {
      month: "Month 4-5",
      title: "NLP & Transformers",
      description: "Master natural language processing and transformer models",
      skills: [
        "Text Processing & Embeddings",
        "Transformer Architecture",
        "BERT, RoBERTa, T5 Models",
        "Fine-tuning Strategies",
        "NLP Applications Development",
      ],
    },
    {
      month: "Month 5-6",
      title: "GenAI Engineering & Production",
      description: "Build and deploy production-ready GenAI applications",
      skills: [
        "LLM Fine-tuning (LoRA, QLoRA)",
        "RAG System Implementation",
        "Multi-agent Systems with LangGraph",
        "CI/CD for AI Applications",
        "Capstone Project & Portfolio Building",
      ],
    },
    {
      month: "Post-Course",
      title: "Career Transition Support",
      description: "Comprehensive placement assistance until you land an AI role",
      skills: [
        "Resume & Portfolio Review",
        "Interview Preparation",
        "AI Engineering Job Placement",
        "Networking with Industry Partners",
        "Continued Learning Resources",
      ],
    },
  ]

  return (
    <div className="space-y-8">
      <div className="relative">
        {roadmapSteps.map((step, index) => (
          <div key={index} className="relative mb-12 last:mb-0">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Timeline indicator */}
              <div className="hidden md:flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm z-10">
                  {index + 1}
                </div>
                {index < roadmapSteps.length - 1 && (
                  <div className="w-1 bg-gradient-to-b from-purple-500 to-pink-500 h-full mt-2 mb-2"></div>
                )}
              </div>

              {/* Content */}
              <Card className="flex-1 border-purple-100 hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <div className="md:hidden w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm mb-4">
                    {index + 1}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {step.month}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground mb-4">{step.description}</p>
                  <div className="space-y-2">
                    {step.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>

                  {index < roadmapSteps.length - 1 && (
                    <div className="flex justify-center mt-4 md:hidden">
                      <ArrowRight className="h-6 w-6 text-purple-500 transform rotate-90" />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
