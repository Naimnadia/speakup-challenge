
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import Header from '@/components/Header';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage,
  FormDescription
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Dialog,
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, ListPlus, Clock, Star, Mic } from 'lucide-react';

const challengeSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters' }),
  description: z.string().min(20, { message: 'Description must be at least 20 characters' }),
  difficulty: z.enum(['easy', 'medium', 'hard'], { 
    required_error: 'Please select a difficulty level' 
  }),
  timeEstimate: z.string().min(1, { message: 'Please provide a time estimate' }),
  xpReward: z.coerce.number().min(10, { message: 'XP reward must be at least 10 points' }),
  instructions: z.string().min(20, { message: 'Instructions must be at least 20 characters' }),
});

type ChallengeFormValues = z.infer<typeof challengeSchema>;

// Sample data for the challenges table
const sampleChallenges = [
  {
    id: 1,
    title: "Describe Your Hometown",
    difficulty: "easy",
    timeEstimate: "3-5 min",
    xpReward: 50
  },
  {
    id: 2,
    title: "Debate Climate Change Solutions",
    difficulty: "hard",
    timeEstimate: "10-15 min",
    xpReward: 150
  },
  {
    id: 3,
    title: "Explain Your Favorite Hobby",
    difficulty: "medium",
    timeEstimate: "5-8 min",
    xpReward: 100
  }
];

const AdminChallenge = () => {
  const form = useForm<ChallengeFormValues>({
    resolver: zodResolver(challengeSchema),
    defaultValues: {
      title: '',
      description: '',
      difficulty: 'medium',
      timeEstimate: '',
      xpReward: 50,
      instructions: '',
    },
  });

  const onSubmit = (data: ChallengeFormValues) => {
    console.log('Challenge data:', data);
    // Here you would typically send this to a backend API
    
    // Simulate success
    toast.success('Challenge added successfully!');
    form.reset();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-speakup-dark">Challenge Administration</h1>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-speakup-blue hover:bg-blue-800">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Challenge
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Speaking Challenge</DialogTitle>
                <DialogDescription>
                  Add details for a new daily speaking challenge. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Challenge Title</FormLabel>
                        <FormControl>
                          <Input placeholder="E.g., Describe Your Dream Vacation" {...field} />
                        </FormControl>
                        <FormDescription>
                          A concise and engaging title for the challenge.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="difficulty"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Difficulty Level</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select difficulty" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="easy">Easy</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="hard">Hard</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="timeEstimate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Time Estimate</FormLabel>
                          <FormControl>
                            <Input placeholder="E.g., 5-7 min" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="xpReward"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>XP Reward</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Challenge Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Briefly describe the challenge and its purpose." 
                            className="min-h-[80px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="instructions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Challenge Instructions</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Detailed instructions for the user. Include any specific points they should address."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => form.reset()}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-speakup-blue hover:bg-blue-800">
                      Save Challenge
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ListPlus className="mr-2 h-5 w-5 text-speakup-blue" />
              Available Challenges
            </CardTitle>
            <CardDescription>
              Manage and review all speaking challenges in the system.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">Difficulty</TableHead>
                  <TableHead className="hidden md:table-cell">Time</TableHead>
                  <TableHead className="hidden md:table-cell">XP</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleChallenges.map((challenge) => (
                  <TableRow key={challenge.id}>
                    <TableCell className="font-medium">{challenge.id}</TableCell>
                    <TableCell>{challenge.title}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        challenge.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                        challenge.difficulty === 'medium' ? 'bg-orange-100 text-orange-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center">
                        <Clock className="mr-1 h-3 w-3 text-speakup-gray" />
                        {challenge.timeEstimate}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center">
                        <Star className="mr-1 h-3 w-3 text-speakup-purple" />
                        {challenge.xpReward} XP
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <span className="sr-only">Edit</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                          <path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5" />
                          <polyline points="14 2 14 8 20 8" />
                          <path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z" />
                        </svg>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdminChallenge;
