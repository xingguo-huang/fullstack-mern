import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Lesson Plan Generator</h1>
        <p className="text-xl text-gray-600">
          Create customized, effective, and engaging lesson plans tailored to your teaching needs.
        </p>
      </div>

      {/* Key Features */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Key Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          {[
            { icon: '🏫', title: 'Education Level', desc: 'Elementary to graduate levels' },
            { icon: '📝', title: 'Customizable Content', desc: 'Topic & duration control' },
            { icon: '📖', title: 'Teaching Styles', desc: 'Choose instructional methods' },
            { icon: '📦', title: 'Materials Output', desc: 'Slides, quizzes, and more' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow transition">
              <div className="flex flex-col items-center">
                <div className="text-3xl mb-2">{icon}</div>
                <h3 className="text-base font-semibold text-gray-800">{title}</h3>
                <p className="text-sm text-gray-500 mt-1">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Quick Links */}
      <div className="flex flex-col md:flex-row justify-center gap-4 mb-16">
        <Link 
          to="/lesson-plan" 
          className="bg-blue-600 text-white py-3 px-6 rounded-md text-center font-medium hover:bg-blue-700 transition-colors"
        >
          📝 Create Lesson Plan
        </Link>
        <Link 
          to="/articles" 
          className="bg-gray-100 text-gray-800 py-3 px-6 rounded-md text-center font-medium hover:bg-gray-200 transition-colors"
        >
          📚 Browse Articles
        </Link>
      </div>
      
      {/* Simple How-To Section */}
      <div className="bg-gray-50 p-6 rounded-lg mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-center">How It Works</h2>
        <ul className="space-y-3">
          {[
            'Fill out the form with your lesson requirements',
            'Generate a customized lesson plan with AI',
            'Review, refine, and generate learning materials',
            'Download your complete lesson plan package',
          ].map((text, idx) => (
            <li key={idx} className="flex items-start">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                {idx + 1}
              </span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>

      
      <div className="text-center">
        <p className="text-gray-500 mb-4">
          This tool leverages AI to save you time and effort in the lesson planning process, 
          allowing you to focus on what you do best - teaching.
        </p>
        <Link 
          to="/lesson-plan" 
          className="inline-block font-medium text-blue-600 hover:underline"
        >
          Get started today →
        </Link>
      </div>
    </div>
  );
}