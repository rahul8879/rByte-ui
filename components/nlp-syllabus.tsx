import { CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function NLPSyllabus() {
  const syllabusWeeks = [
    {
      week: "Week 1",
      title: "NLP & Python Foundations",
      topics: [
        "Python for NLP: NumPy, Pandas, NLTK",
        "Text preprocessing techniques",
        "Tokenization, stemming, and lemmatization",
        "Regular expressions for text processing",
      ],
    },
    {
      week: "Week 2",
      title: "Advanced NLP & Transformers",
      topics: [
        "Word embeddings: Word2Vec, GloVe, FastText",
        "Transformer architecture deep dive",
        "Attention mechanisms explained",
        "BERT, RoBERTa, and T5 models",
      ],
    },
    {
      week: "Week 3",
      title: "LLM Engineering & Fine-tuning",
      topics: [
        "LLM architecture and capabilities",
        "Parameter-efficient fine-tuning (LoRA, QLoRA)",
        "Prompt engineering techniques",
        "RAG system implementation",
      ],
    },
    {
      week: "Week 4",
      title: "Production & Deployment",
      topics: [
        "Building AI agents with Langgraph",
        "CI/CD for NLP models",
        "Model optimization and quantization",
        "Capstone project & interview preparation",
      ],
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {syllabusWeeks.map((week) => (
        <Card key={week.week} className="overflow-hidden border-purple-100 hover:shadow-md transition-all">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 py-2 px-4">
            <h3 className="text-white font-medium">
              {week.week}: {week.title}
            </h3>
          </div>
          <CardContent className="pt-4">
            <ul className="space-y-2">
              {week.topics.map((topic, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
