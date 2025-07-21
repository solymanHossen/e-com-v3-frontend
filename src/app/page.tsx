import Image from "next/image";
import ThemeController from "@/components/ThemeController";

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Dynamic Theme Demo
        </h1>
        <p className="text-lg text-secondary">
          This demonstrates the dynamic theme configuration system
        </p>
      </div>

      {/* Color Showcase */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Color Palette</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-primary text-white p-4 rounded-lg">
            <div className="font-semibold">Primary</div>
            <div className="text-sm opacity-90">var(--color-primary)</div>
          </div>
          <div className="bg-secondary text-black p-4 rounded-lg border">
            <div className="font-semibold">Secondary</div>
            <div className="text-sm opacity-70">var(--color-secondary)</div>
          </div>
          <div className="bg-success text-white p-4 rounded-lg">
            <div className="font-semibold">Success</div>
            <div className="text-sm opacity-90">var(--color-success)</div>
          </div>
          <div className="bg-warning text-white p-4 rounded-lg">
            <div className="font-semibold">Warning</div>
            <div className="text-sm opacity-90">var(--color-warning)</div>
          </div>
        </div>
      </div>

      {/* Typography Showcase */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Typography Scale</h2>
        <div className="space-y-2">
          <div className="text-xs">Extra Small Text (xs)</div>
          <div className="text-sm">Small Text (sm)</div>
          <div className="text-md">Medium Text (md)</div>
          <div className="text-lg">Large Text (lg)</div>
          <div className="text-xl">Extra Large Text (xl)</div>
          <div className="text-2xl">2X Large Text (2xl)</div>
          <div className="text-3xl">3X Large Text (3xl)</div>
        </div>
      </div>

      {/* Interactive Elements */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Interactive Elements</h2>
        <div className="flex flex-wrap gap-4">
          <button className="bg-primary text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity">
            Primary Button
          </button>
          <button className="bg-success text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity">
            Success Button
          </button>
          <button className="bg-warning text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity">
            Warning Button
          </button>
          <button className="border-2 border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition-all">
            Outlined Button
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Card Components</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="border border-primary rounded-lg p-6">
            <h3 className="text-lg font-semibold text-primary mb-2">Primary Card</h3>
            <p className="text-secondary">This card uses the primary border color and demonstrates the dynamic theming.</p>
          </div>
          <div className="bg-success text-white rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Success Card</h3>
            <p className="opacity-90">This card uses the success background color from the theme.</p>
          </div>
          <div className="bg-warning text-white rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Warning Card</h3>
            <p className="opacity-90">This card uses the warning background color from the theme.</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Image
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          className="mx-auto"
        />
      </div>
      
      {/* Theme Controller */}
      <ThemeController />
    </div>
  );
}
