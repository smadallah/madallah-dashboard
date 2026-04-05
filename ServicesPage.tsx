import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import { mockServices } from '../lib/mockData';
import { Service } from '../lib/types';
import {
  Wifi,
  Printer,
  ScanLine,
  Copy,
  Gamepad2,
  Cloud,
  GraduationCap,
  BookOpen,
  FileText,
  Users,
  Video,
  Search,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';

const iconMap: Record<string, any> = {
  Wifi,
  Printer,
  ScanLine,
  Copy,
  Gamepad2,
  Cloud,
  GraduationCap,
  BookOpen,
  FileText,
  Users,
  Video,
};

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'cyber' | 'education'>('all');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingNotes, setBookingNotes] = useState('');

  const filteredServices = mockServices.filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const cyberServices = filteredServices.filter(s => s.category === 'cyber');
  const educationServices = filteredServices.filter(s => s.category === 'education');

  const handleBookService = () => {
    if (!bookingDate || !bookingTime) {
      toast.error('Please select date and time');
      return;
    }

    toast.success(`Service booked successfully! ${selectedService?.name} on ${bookingDate} at ${bookingTime}`);
    setSelectedService(null);
    setBookingDate('');
    setBookingTime('');
    setBookingNotes('');
  };

  const ServiceCard = ({ service }: { service: Service }) => {
    const Icon = iconMap[service.icon] || BookOpen;

    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-lg ${
                service.category === 'cyber' ? 'bg-blue-100' : 'bg-purple-100'
              }`}>
                <Icon className={`w-6 h-6 ${
                  service.category === 'cyber' ? 'text-blue-600' : 'text-purple-600'
                }`} />
              </div>
              <div>
                <CardTitle className="text-lg">{service.name}</CardTitle>
                <Badge variant={service.available ? 'default' : 'secondary'} className="mt-1">
                  {service.available ? 'Available' : 'Unavailable'}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="mb-4">{service.description}</CardDescription>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-blue-600">₦{service.price.toLocaleString()}</p>
              {service.duration && (
                <p className="text-sm text-gray-500">{service.duration} minutes</p>
              )}
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  disabled={!service.available}
                  onClick={() => setSelectedService(service)}
                >
                  Book Now
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Book {service.name}</DialogTitle>
                  <DialogDescription>
                    Schedule your booking for this service
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any special requirements or notes..."
                      value={bookingNotes}
                      onChange={(e) => setBookingNotes(e.target.value)}
                    />
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Service Cost:</span>
                      <span className="font-semibold">₦{service.price.toLocaleString()}</span>
                    </div>
                    {service.duration && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-semibold">{service.duration} min</span>
                      </div>
                    )}
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setSelectedService(null)}>
                    Cancel
                  </Button>
                  <Button onClick={handleBookService}>
                    Confirm Booking
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Services</h1>
        <p className="text-gray-600 mt-1">Browse and book our services</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          placeholder="Search services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Tabs for Categories */}
      <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Services</TabsTrigger>
          <TabsTrigger value="cyber">Cyber Café</TabsTrigger>
          <TabsTrigger value="education">Educational</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6 mt-6">
          {/* Cyber Services */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Cyber Café Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cyberServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>

          {/* Educational Services */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Educational Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {educationServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="cyber" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cyberServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="education" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {educationServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
