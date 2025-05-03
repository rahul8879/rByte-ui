import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CheckCircle } from "lucide-react"

export default function DetailedCurriculum() {
  const curriculumModules = [
    {
      title: "Python Programming for AI",
      description: "Master Python programming with a focus on AI and data science applications",
      topics: [
        "Python fundamentals and advanced concepts",
        "Object-oriented programming in Python",
        "Functional programming techniques",
        "Error handling and debugging",
        "Package management and virtual environments",
        "Writing efficient and clean Python code",
      ],
    },
    {
      title: "Data Science Libraries",
      description: "Learn essential libraries for data manipulation, analysis, and visualization",
      topics: [
        "Data manipulation with Pandas",
        "Numerical computing with NumPy",
        "Scientific computing with SciPy",
        "Data visualization with Matplotlib and Seaborn",
        "Statistical analysis and hypothesis testing",
        "Working with different data formats and databases",
      ],
    },
    {
      title: "Machine Learning Fundamentals",
      description: "Build a strong foundation in machine learning algorithms and techniques",
      topics: [
        "Supervised learning algorithms",
        "Unsupervised learning techniques",
        "Feature engineering and selection",
        "Model evaluation and validation",
        "Ensemble methods and boosting",
        "Time series analysis and forecasting",
      ],
    },
    {
      title: "Deep Learning with TensorFlow",
      description: "Dive into neural networks and deep learning frameworks",
      topics: [
        "Neural network fundamentals",
        "TensorFlow and Keras frameworks",
        "Building and training neural networks",
        "Convolutional Neural Networks (CNNs)",
        "Recurrent Neural Networks (RNNs)",
        "Transfer learning and fine-tuning",
      ],
    },
    {
      title: "Natural Language Processing",
      description: "Master techniques for processing and understanding human language",
      topics: [
        "Text preprocessing and tokenization",
        "Word embeddings (Word2Vec, GloVe, FastText)",
        "Sentiment analysis and text classification",
        "Named Entity Recognition (NER)",
        "Topic modeling and text summarization",
        "Machine translation fundamentals",
      ],
    },
    {
      title: "Transformer Models & BERT",
      description: "Understand the architecture that powers modern NLP",
      topics: [
        "Transformer architecture deep dive",
        "Attention mechanisms explained",
        "BERT, RoBERTa, and T5 models",
        "Fine-tuning pre-trained transformers",
        "Transfer learning in NLP",
        "Building transformer-based applications",
      ],
    },
    {
      title: "Large Language Models (LLMs)",
      description: "Work with state-of-the-art language models and their applications",
      topics: [
        "LLM architecture and capabilities",
        "Prompt engineering techniques",
        "Few-shot and zero-shot learning",
        "Parameter-efficient fine-tuning (LoRA, QLoRA)",
        "LLM evaluation and benchmarking",
        "Ethical considerations and limitations",
      ],
    },
    {
      title: "Retrieval-Augmented Generation (RAG)",
      description: "Build systems that combine knowledge retrieval with text generation",
      topics: [
        "Vector databases and embeddings",
        "Document chunking strategies",
        "Retrieval mechanisms and ranking",
        "Hybrid search techniques",
        "Context augmentation and synthesis",
        "Building production-ready RAG systems",
      ],
    },
    {
      title: "Multi-Agent AI Systems",
      description: "Develop sophisticated agentic solutions using LangGraph",
      topics: [
        "Agent architecture and design patterns",
        "Tool use and function calling",
        "Multi-agent systems and collaboration",
        "Memory and state management",
        "Debugging and optimizing agent workflows",
        "Building complex agent applications",
      ],
    },
    {
      title: "MLOps & AI Engineering",
      description: "Learn best practices for deploying and maintaining AI systems",
      topics: [
        "CI/CD pipelines for ML models",
        "Model versioning and experiment tracking",
        "Monitoring and observability",
        "Scalable deployment architectures",
        "Model optimization and quantization",
        "Testing and validation frameworks",
      ],
    },
    {
      title: "AI Project Portfolio Development",
      description: "Build impressive projects to showcase your skills to employers",
      topics: [
        "Portfolio planning and development",
        "GitHub repository setup and documentation",
        "Building end-to-end AI applications",
        "Deployment to cloud platforms",
        "Creating compelling demonstrations",
        "Presenting technical projects effectively",
      ],
    },
    {
      title: "Career Transition & Interview Preparation",
      description: "Prepare for AI engineering roles and interviews",
      topics: [
        "Resume and LinkedIn optimization for AI roles",
        "Technical interview preparation",
        "System design for AI applications",
        "Behavioral interview strategies",
        "Salary negotiation techniques",
        "Networking in the AI community",
      ],
    },
  ]

  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible className="w-full">
        {curriculumModules.map((module, index) => (
          <AccordionItem
            key={index}
            value={`module-${index}`}
            className="border border-purple-100 rounded-lg mb-4 overflow-hidden"
          >
            <AccordionTrigger className="px-6 py-4 hover:bg-purple-50 hover:no-underline">
              <div className="flex items-start text-left">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{module.title}</h3>
                  <p className="text-muted-foreground text-sm">{module.description}</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 pt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                {module.topics.map((topic, topicIndex) => (
                  <div key={topicIndex} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
