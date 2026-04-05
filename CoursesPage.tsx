import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Progress } from '../components/ui/progress';
import { mockCourses } from '../lib/mockData';
import { Course } from '../lib/types';
import {
  Search,
  Star,
  Users,
  Clock,
  BookOpen,
  Video,
  Award,
  TrendingUp,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { toast } from 'sonner';
import { Separator } from '../components/ui/separator';

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<'all' | Course['level']>('all');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const filteredCourses = mockCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  const handleEnrollCourse = (course: Course) => {
    toast.success(`Successfully enrolled in ${course.title}!`);
    setSelectedCourse(null);
  };

  const CourseCard = ({ course }: { course: Course }) => (
    <Card className="hover:shadow-lg transition-shadow overflow-hidden">
      <div className="aspect-video bg-gray-200 overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <Badge variant={
            course.level === 'beginner' ? 'default' :
            course.level === 'intermediate' ? 'secondary' : 'outline'
          }>
            {course.level}
          </Badge>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{course.rating}</span>
          </div>
        </div>
        <CardTitle className="text-xl line-clamp-2">{course.title}</CardTitle>
        <CardDescription className="line-clamp-2">{course.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{course.enrolled} students</span>
          </div>
        </div>
        <p className="text-sm text-gray-600">By {course.instructor}</p>
        <Separator />
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">
            ₦{course.price.toLocaleString()}
          </span>
          <Dialog>
            <DialogTrigger asChild>
              <Button onClick={() => setSelectedCourse(course)}>
                View Details
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <DialogTitle className="text-2xl">{course.title}</DialogTitle>
                <DialogDescription className="text-base">
                  {course.description}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Level</p>
                      <p className="font-semibold capitalize">{course.level}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600">Duration</p>
                      <p className="font-semibold">{course.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="text-sm text-gray-600">Students</p>
                      <p className="font-semibold">{course.enrolled}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <div>
                      <p className="text-sm text-gray-600">Rating</p>
                      <p className="font-semibold">{course.rating}/5.0</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-2">Instructor</h4>
                  <p className="text-gray-700">{course.instructor}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">What you'll learn</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Comprehensive understanding of core concepts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Hands-on practical projects and assignments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Industry-standard best practices</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Certificate of completion</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700">Course Price:</span>
                    <span className="text-3xl font-bold text-blue-600">
                      ₦{course.price.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">30-day money-back guarantee</p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedCourse(null)}>
                  Close
                </Button>
                <Button onClick={() => handleEnrollCourse(course)}>
                  Enroll Now
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Online Courses</h1>
        <p className="text-gray-600 mt-1">Learn new skills and advance your career</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <p className="text-sm text-gray-600">Total Courses</p>
            </div>
            <p className="text-2xl font-bold">{mockCourses.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Video className="w-4 h-4 text-green-600" />
              <p className="text-sm text-gray-600">My Courses</p>
            </div>
            <p className="text-2xl font-bold text-green-600">2</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              <p className="text-sm text-gray-600">In Progress</p>
            </div>
            <p className="text-2xl font-bold text-purple-600">1</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-4 h-4 text-orange-600" />
              <p className="text-sm text-gray-600">Completed</p>
            </div>
            <p className="text-2xl font-bold text-orange-600">1</p>
          </CardContent>
        </Card>
      </div>

      {/* My Learning Progress */}
      <Card>
        <CardHeader>
          <CardTitle>My Learning Progress</CardTitle>
          <CardDescription>Continue where you left off</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <img
                src={mockCourses[0].thumbnail}
                alt={mockCourses[0].title}
                className="w-24 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <h4 className="font-semibold">{mockCourses[0].title}</h4>
                <div className="flex items-center gap-2 mt-2">
                  <Progress value={65} className="flex-1" />
                  <span className="text-sm text-gray-600">65%</span>
                </div>
              </div>
              <Button>Continue</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Tabs value={selectedLevel} onValueChange={(v) => setSelectedLevel(v as any)} className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="all">All Levels</TabsTrigger>
            <TabsTrigger value="beginner">Beginner</TabsTrigger>
            <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
