import { CreateSection } from './CreateSection';
import { RecentSection } from './RecentSection';

export function MainContent() {
  return (
    <div className="flex-1 flex flex-col bg-transparent">
      {/* Main Content */}
      <main className="flex-1 px-8 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 text-left">
            <h1 className="text-4xl font-bold text-foreground">Welcome, Sam Roy!</h1>
          </div>
          <div className="space-y-10">
            <CreateSection />
            <RecentSection />
          </div>
        </div>
      </main>
    </div>
  );
}