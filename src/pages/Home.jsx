import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="bg-orange-100 text-orange-900 min-h-screen flex flex-col font-sans overflow-hidden">
      <header className="bg-orange-500 text-white w-full p-6 shadow-lg flex justify-center">
        <h1 className="text-3xl md:text-4xl font-bold">HTML TAGS</h1>
      </header>

      <main className="flex flex-col md:flex-row items-center justify-center flex-grow px-10">
        <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
          <div className="w-72 md:w-96">
            <img src="src/assets/cute-halloween-3d-skeleton.jpg" alt="Taggy 3D Model" className="w-full h-full object-contain" />
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col items-center justify-between">
          <div className="flex flex-wrap justify-center gap-2 p-6">
            {[
              'html','head','title','meta','body','header','nav','section','article','footer',
              'div','span','h1','p','a','img','ul','ol','li','table','form','input','button','label',
              'textarea','select','option','iframe','video','audio','canvas','svg'
            ].map((tag) => (
              <span key={tag} className="tag-bubble bg-white/90 text-orange-700 font-mono text-sm px-3 py-1 rounded-full">
                &lt;{tag}&gt;
              </span>
            ))}
          </div>

          <div className="mt-6">
            <Link to="/html-reference" className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition">
              Go to HTML Tag Reference →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}