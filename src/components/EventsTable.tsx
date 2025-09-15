import { useState, useMemo } from "react";
import { Event } from "../types/event";
import { eventsData } from "../data/eventsData";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, ExternalLink, Calendar, MapPin, Mic } from "lucide-react";

const EventsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Get unique years from the data
  const availableYears = useMemo(() => {
    const years = [...new Set(eventsData.map(event => event.year))];
    return years.sort((a, b) => b - a);
  }, []);

  // Filter events based on search term and year
  const filteredEvents = useMemo(() => {
    return eventsData.filter(event => {
      const matchesSearch = event.eventName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesYear = selectedYear === "all" || event.year.toString() === selectedYear;
      return matchesSearch && matchesYear;
    });
  }, [searchTerm, selectedYear]);

  // Paginate filtered events
  const paginatedEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredEvents.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredEvents, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedYear, itemsPerPage]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="p-6 shadow-card-custom border-border/40">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search events by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background border-border/60 focus:border-primary/50 transition-smooth"
            />
          </div>
          
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-full md:w-40 bg-background border-border/60 focus:border-primary/50">
              <SelectValue placeholder="Filter by year" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border/60">
              <SelectItem value="all">All Years</SelectItem>
              {availableYears.map(year => (
                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(parseInt(value))}>
            <SelectTrigger className="w-full md:w-32 bg-background border-border/60 focus:border-primary/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border/60">
              <SelectItem value="5">Show 5</SelectItem>
              <SelectItem value="10">Show 10</SelectItem>
              <SelectItem value="20">Show 20</SelectItem>
              <SelectItem value="50">Show 50</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="text-sm text-muted-foreground">
          Showing {paginatedEvents.length} of {filteredEvents.length} events
        </div>
      </Card>

      {/* Events Table */}
      <Card className="shadow-card-custom border-border/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-hero border-b border-border/40">
                <th className="text-left p-4 font-semibold text-foreground">Event No.</th>
                <th className="text-left p-4 font-semibold text-foreground">Dates</th>
                <th className="text-left p-4 font-semibold text-foreground">Event Name</th>
                <th className="text-left p-4 font-semibold text-foreground">Location</th>
                <th className="text-left p-4 font-semibold text-foreground">Language</th>
                <th className="text-left p-4 font-semibold text-foreground">YouTube</th>
              </tr>
            </thead>
            <tbody>
              {paginatedEvents.map((event, index) => (
                <tr 
                  key={event.id} 
                  className={`border-b border-border/30 hover:bg-secondary/30 transition-smooth ${
                    index % 2 === 0 ? 'bg-background' : 'bg-secondary/10'
                  }`}
                >
                  <td className="p-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {event.eventNo}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{event.dates}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-foreground">{event.eventName}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{event.city}, {event.country}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Mic className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{event.language}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-accent/40 text-accent hover:bg-accent hover:text-accent-foreground transition-smooth"
                      asChild
                    >
                      <a href={event.youtubeLink} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Watch
                      </a>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <Card className="p-4 shadow-card-custom border-border/40">
          <div className="flex justify-center items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="border-border/60 hover:bg-secondary/50"
            >
              Previous
            </Button>
            
            <span className="text-sm text-muted-foreground px-4">
              Page {currentPage} of {totalPages}
            </span>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="border-border/60 hover:bg-secondary/50"
            >
              Next
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default EventsTable;