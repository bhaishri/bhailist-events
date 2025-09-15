import EventsTable from "../components/EventsTable";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="bg-gradient-primary shadow-spiritual">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-3">
              Bhai Shri
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-2">
              Spiritual Teaching Events & Katha Recordings
            </p>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              Discover and explore spiritual teachings through our comprehensive collection of Katha events, 
              complete with recordings and detailed information.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/*<div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Spiritual Events Collection
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Browse through our extensive archive of spiritual teachings, discourses, and Katha events. 
              Use the search and filter options to find specific events by name or year.
            </p>
          </div>*/}
          
          <EventsTable />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-secondary/30 border-t border-border/40 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-muted-foreground mb-2">
              © 2024 BhaiShri.com - Preserving Spiritual Wisdom
            </p>
            <p className="text-sm text-muted-foreground/80">
              All teachings and recordings are shared with devotion and respect
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;