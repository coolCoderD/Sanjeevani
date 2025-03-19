import React from 'react';
import { Salad, Dumbbell, BarChart, Clock, ArrowRight, Heart, Utensils, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FadeIn from '@/components/animations/FadeIn';

const DietFitness = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-health-50/30">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-24">
        <FadeIn>
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Personalized Diet & Fitness</h1>
          <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
            Get customized nutrition and exercise plans based on your health data and goals
          </p>
        </FadeIn>
        
        <Tabs defaultValue="diet" className="w-full max-w-4xl mx-auto">
          <TabsList className="w-full justify-center bg-transparent space-x-2">
            <TabsTrigger 
              value="diet"
              className="data-[state=active]:bg-health-500 data-[state=active]:text-white py-2 px-4 rounded-full"
            >
              <Utensils className="mr-2 h-4 w-4" />
              Diet Plan
            </TabsTrigger>
            <TabsTrigger 
              value="fitness"
              className="data-[state=active]:bg-health-500 data-[state=active]:text-white py-2 px-4 rounded-full"
            >
              <Dumbbell className="mr-2 h-4 w-4" />
              Fitness Plan
            </TabsTrigger>
            <TabsTrigger 
              value="progress"
              className="data-[state=active]:bg-health-500 data-[state=active]:text-white py-2 px-4 rounded-full"
            >
              <BarChart className="mr-2 h-4 w-4" />
              Progress
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-8">
            <TabsContent value="diet" className="mt-0">
              <FadeIn>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card className="bg-white shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <div className="bg-health-100 p-2 rounded-lg">
                          <Utensils className="h-6 w-6 text-health-600" />
                        </div>
                        <span className="text-sm text-muted-foreground">Daily Goal</span>
                      </div>
                      <h3 className="text-2xl font-bold mt-2">1,800</h3>
                      <p className="text-sm text-muted-foreground">Calories</p>
                      <Progress value={65} className="h-2 mt-4" />
                      <div className="flex justify-between text-xs mt-1">
                        <span>0</span>
                        <span>1170 cal consumed</span>
                        <span>1800</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <Salad className="h-6 w-6 text-blue-600" />
                        </div>
                        <span className="text-sm text-muted-foreground">Nutrients</span>
                      </div>
                      <div className="space-y-3 mt-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Protein</span>
                            <span className="text-muted-foreground">45g / 90g</span>
                          </div>
                          <Progress value={50} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Carbs</span>
                            <span className="text-muted-foreground">120g / 180g</span>
                          </div>
                          <Progress value={67} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Fat</span>
                            <span className="text-muted-foreground">35g / 60g</span>
                          </div>
                          <Progress value={58} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <div className="bg-green-100 p-2 rounded-lg">
                          <Heart className="h-6 w-6 text-green-600" />
                        </div>
                        <span className="text-sm text-muted-foreground">Water Intake</span>
                      </div>
                      <h3 className="text-2xl font-bold mt-2">4 / 8</h3>
                      <p className="text-sm text-muted-foreground">Glasses (250ml)</p>
                      <div className="grid grid-cols-8 gap-1 mt-4">
                        {[...Array(8)].map((_, i) => (
                          <div 
                            key={i} 
                            className={`h-8 rounded-full ${i < 4 ? 'bg-sky-400' : 'bg-muted'}`} 
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </FadeIn>
              
              <FadeIn delay={100}>
                <Card className="bg-white mb-8">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Clock className="mr-2 h-5 w-5 text-health-500" />
                      Today's Meal Plan
                    </h3>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium text-health-600 mb-2">Breakfast</h4>
                        <Card className="border bg-secondary/30">
                          <CardContent className="p-4">
                            <div className="flex gap-4">
                              <div className="h-16 w-16 bg-muted rounded-md"></div>
                              <div>
                                <h5 className="font-medium">Greek Yogurt Bowl</h5>
                                <p className="text-sm text-muted-foreground">Greek yogurt, mixed berries, honey, granola</p>
                                <div className="flex gap-3 mt-2">
                                  <span className="text-xs bg-secondary px-2 py-1 rounded">320 cal</span>
                                  <span className="text-xs bg-secondary px-2 py-1 rounded">20g protein</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-health-600 mb-2">Lunch</h4>
                        <Card className="border bg-secondary/30">
                          <CardContent className="p-4">
                            <div className="flex gap-4">
                              <div className="h-16 w-16 bg-muted rounded-md"></div>
                              <div>
                                <h5 className="font-medium">Mediterranean Salad</h5>
                                <p className="text-sm text-muted-foreground">Mixed greens, grilled chicken, feta, olives, olive oil</p>
                                <div className="flex gap-3 mt-2">
                                  <span className="text-xs bg-secondary px-2 py-1 rounded">450 cal</span>
                                  <span className="text-xs bg-secondary px-2 py-1 rounded">35g protein</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-health-600 mb-2">Dinner</h4>
                        <Card className="border bg-secondary/30">
                          <CardContent className="p-4">
                            <div className="flex gap-4">
                              <div className="h-16 w-16 bg-muted rounded-md"></div>
                              <div>
                                <h5 className="font-medium">Baked Salmon</h5>
                                <p className="text-sm text-muted-foreground">Salmon, quinoa, roasted vegetables, lemon</p>
                                <div className="flex gap-3 mt-2">
                                  <span className="text-xs bg-secondary px-2 py-1 rounded">520 cal</span>
                                  <span className="text-xs bg-secondary px-2 py-1 rounded">40g protein</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="px-6 py-4 bg-muted/30 flex justify-between">
                    <Button variant="outline" size="sm">
                      View Full Weekly Plan
                    </Button>
                    <Button variant="outline" size="sm">
                      Customize Meals
                    </Button>
                  </CardFooter>
                </Card>
              </FadeIn>
              
              <FadeIn delay={200}>
                <div className="bg-health-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium mb-4">Dietary Recommendations</h3>
                  <p className="text-muted-foreground mb-4">
                    Based on your health profile and nutrition needs, we recommend the following adjustments:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-start">
                        <div className="bg-green-100 p-2 rounded-full mr-3">
                          <ArrowRight className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Increase</h4>
                          <p className="text-sm text-muted-foreground">Omega-3 fatty acids, fiber, and vitamin D</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-start">
                        <div className="bg-red-100 p-2 rounded-full mr-3">
                          <ArrowRight className="h-4 w-4 text-red-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Reduce</h4>
                          <p className="text-sm text-muted-foreground">Processed sugars, sodium, and saturated fats</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </TabsContent>
            
            <TabsContent value="fitness" className="mt-0">
              <FadeIn>
                <Card className="mb-8">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Dumbbell className="mr-2 h-5 w-5 text-health-500" />
                      Today's Workout Plan
                    </h3>
                    
                    <div className="p-4 bg-health-50 rounded-lg mb-6">
                      <div className="flex justify-between mb-3">
                        <h4 className="font-medium">Moderate Intensity Cardio</h4>
                        <span className="text-sm text-health-600">30 min</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        Focus on maintaining elevated heart rate with moderate exertion
                      </p>
                      <Progress value={0} className="h-2" />
                    </div>
                    
                    <div className="space-y-6">
                      <div className="flex items-center gap-4 p-3 hover:bg-muted/30 rounded-lg transition-colors">
                        <div className="bg-blue-100 h-14 w-14 rounded-full flex items-center justify-center flex-shrink-0">
                          <Dumbbell className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-medium">Warm-up</h4>
                          <p className="text-sm text-muted-foreground">5 minutes of light stretching</p>
                        </div>
                        <Button variant="ghost" size="sm">Start</Button>
                      </div>
                      
                      <div className="flex items-center gap-4 p-3 hover:bg-muted/30 rounded-lg transition-colors">
                        <div className="bg-blue-100 h-14 w-14 rounded-full flex items-center justify-center flex-shrink-0">
                          <Dumbbell className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-medium">Brisk Walking or Jogging</h4>
                          <p className="text-sm text-muted-foreground">20 minutes at moderate pace</p>
                        </div>
                        <Button variant="ghost" size="sm">Start</Button>
                      </div>
                      
                      <div className="flex items-center gap-4 p-3 hover:bg-muted/30 rounded-lg transition-colors">
                        <div className="bg-blue-100 h-14 w-14 rounded-full flex items-center justify-center flex-shrink-0">
                          <Dumbbell className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-medium">Cool Down</h4>
                          <p className="text-sm text-muted-foreground">5 minutes of light stretching</p>
                        </div>
                        <Button variant="ghost" size="sm">Start</Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="px-6 py-4 bg-muted/30 flex justify-between">
                    <Button variant="outline" size="sm">
                      View Weekly Schedule
                    </Button>
                    <Button variant="health" size="sm">
                      Start Workout
                    </Button>
                  </CardFooter>
                </Card>
              </FadeIn>
              
              <FadeIn delay={100}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-medium mb-4">Activity Goals</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Steps</span>
                            <span className="text-muted-foreground">5,430 / 10,000</span>
                          </div>
                          <Progress value={54} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Active Minutes</span>
                            <span className="text-muted-foreground">45 / 150 per week</span>
                          </div>
                          <Progress value={30} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Workouts</span>
                            <span className="text-muted-foreground">2 / 5 per week</span>
                          </div>
                          <Progress value={40} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-medium mb-4">Health Metrics</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-secondary p-4 rounded-lg">
                          <h4 className="text-sm text-muted-foreground">Resting Heart Rate</h4>
                          <div className="text-2xl font-semibold mt-1">68 <span className="text-sm font-normal">bpm</span></div>
                        </div>
                        <div className="bg-secondary p-4 rounded-lg">
                          <h4 className="text-sm text-muted-foreground">Average Sleep</h4>
                          <div className="text-2xl font-semibold mt-1">7.2 <span className="text-sm font-normal">hours</span></div>
                        </div>
                        <div className="bg-secondary p-4 rounded-lg">
                          <h4 className="text-sm text-muted-foreground">Body Mass Index</h4>
                          <div className="text-2xl font-semibold mt-1">24.3</div>
                        </div>
                        <div className="bg-secondary p-4 rounded-lg">
                          <h4 className="text-sm text-muted-foreground">Recovery Score</h4>
                          <div className="text-2xl font-semibold mt-1">82<span className="text-sm font-normal">/100</span></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </FadeIn>
              
              <FadeIn delay={200}>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-4">Weekly Workout Schedule</h3>
                    <div className="grid grid-cols-7 gap-2">
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                        <div key={i} className="text-center">
                          <div className="text-sm font-medium mb-2">{day}</div>
                          <div className={`h-20 rounded-lg flex items-center justify-center text-xs ${i < 2 ? 'bg-health-100 text-health-800' : 'bg-muted'}`}>
                            {i === 0 && 'Cardio'}
                            {i === 1 && 'Strength'}
                            {i === 3 && 'Cardio'}
                            {i === 5 && 'Rest'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            </TabsContent>
            
            <TabsContent value="progress" className="mt-0">
              <FadeIn>
                <Card className="mb-8">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-6 flex items-center">
                      <BarChart className="mr-2 h-5 w-5 text-health-500" />
                      Progress Overview
                    </h3>
                    
                    <div className="h-60 bg-muted rounded-lg flex items-center justify-center mb-6">
                      <p className="text-muted-foreground">Progress chart visualization would appear here</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-secondary p-4 rounded-lg">
                        <h4 className="text-sm text-muted-foreground">Starting Weight</h4>
                        <div className="text-xl font-semibold mt-1">75 <span className="text-sm font-normal">kg</span></div>
                      </div>
                      <div className="bg-secondary p-4 rounded-lg">
                        <h4 className="text-sm text-muted-foreground">Current Weight</h4>
                        <div className="text-xl font-semibold mt-1">72.3 <span className="text-sm font-normal">kg</span></div>
                      </div>
                      <div className="bg-secondary p-4 rounded-lg">
                        <h4 className="text-sm text-muted-foreground">Goal Weight</h4>
                        <div className="text-xl font-semibold mt-1">68 <span className="text-sm font-normal">kg</span></div>
                      </div>
                      <div className="bg-health-50 p-4 rounded-lg">
                        <h4 className="text-sm text-health-700">Progress</h4>
                        <div className="text-xl font-semibold mt-1 text-health-700">38<span className="text-sm font-normal">%</span></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
              
              <FadeIn delay={100}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-medium mb-4">Achievements</h3>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                          <div className="bg-green-100 p-2 rounded-full">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">7-Day Streak</h4>
                            <p className="text-xs text-muted-foreground">Completed all planned activities for 7 days</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <CheckCircle2 className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">10K Steps</h4>
                            <p className="text-xs text-muted-foreground">Reached 10,000 steps in a single day</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                          <div className="bg-purple-100 p-2 rounded-full">
                            <CheckCircle2 className="h-4 w-4 text-purple-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">Nutrition Master</h4>
                            <p className="text-xs text-muted-foreground">Stayed within macro goals for 5 consecutive days</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-medium mb-4">Monthly Summary</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Workout Completion</span>
                            <span>15/20 sessions</span>
                          </div>
                          <Progress value={75} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Diet Adherence</span>
                            <span>80%</span>
                          </div>
                          <Progress value={80} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Weight Loss</span>
                            <span>2.7 kg</span>
                          </div>
                          <Progress value={67} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Sleep Quality</span>
                            <span>7.5/10</span>
                          </div>
                          <Progress value={75} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </FadeIn>
              
              <FadeIn delay={200}>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Goals & Adjustments</h3>
                      <Button variant="outline" size="sm">Update Goals</Button>
                    </div>
                    <div className="space-y-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <h4 className="text-sm font-medium mb-2">Current Goals</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center">
                            <CheckCircle2 className="h-4 w-4 text-health-500 mr-2" />
                            <span>Lose 7kg at a healthy rate of 0.5kg per week</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle2 className="h-4 w-4 text-health-500 mr-2" />
                            <span>Exercise at least 30 minutes, 5 days per week</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle2 className="h-4 w-4 text-health-500 mr-2" />
                            <span>Improve cardiovascular fitness and endurance</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="p-4 bg-health-50 rounded-lg">
                        <h4 className="text-sm font-medium mb-2">AI Recommendations</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Based on your progress, our AI suggests the following adjustments:
                        </p>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center">
                            <ArrowRight className="h-4 w-4 text-health-500 mr-2" />
                            <span>Increase protein intake by 10-15g daily</span>
                          </li>
                          <li className="flex items-center">
                            <ArrowRight className="h-4 w-4 text-health-500 mr-2" />
                            <span>Add one more day of strength training</span>
                          </li>
                          <li className="flex items-center">
                            <ArrowRight className="h-4 w-4 text-health-500 mr-2" />
                            <span>Focus on improving sleep quality</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            </TabsContent>
          </div>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default DietFitness;
