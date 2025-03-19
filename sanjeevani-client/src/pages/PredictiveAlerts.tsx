
import React from 'react';
import { AlertTriangle, Info, Check, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FadeIn from '@/components/animations/FadeIn';

const PredictiveAlerts = () => {
  const highRisks = [
    {
      id: 1,
      title: 'Vitamin D Deficiency',
      description: 'Based on your recent blood work and lifestyle patterns',
      recommendation: 'Consider vitamin D supplements and increased sun exposure',
      severity: 'high',
    },
  ];

  const moderateRisks = [
    {
      id: 2,
      title: 'Elevated Stress Levels',
      description: 'Your activity and sleep patterns indicate increased stress',
      recommendation: 'Try meditation exercises and regular physical activity',
      severity: 'moderate',
    },
    {
      id: 3,
      title: 'Irregular Sleep Pattern',
      description: 'Sleep data shows inconsistent sleep schedule',
      recommendation: 'Establish a consistent sleep routine',
      severity: 'moderate',
    },
  ];

  const lowRisks = [
    {
      id: 4,
      title: 'Inadequate Hydration',
      description: 'Your daily water intake is below recommended levels',
      recommendation: 'Increase water consumption to 8-10 glasses daily',
      severity: 'low',
    },
  ];

  const renderRiskCard = (risk) => {
    const severityColors = {
      high: 'border-l-4 border-l-red-500',
      moderate: 'border-l-4 border-l-amber-500',
      low: 'border-l-4 border-l-blue-500',
    };

    const severityIcons = {
      high: <AlertTriangle className="h-5 w-5 text-red-500" />,
      moderate: <Info className="h-5 w-5 text-amber-500" />,
      low: <Info className="h-5 w-5 text-blue-500" />,
    };

    return (
      <Card key={risk.id} className={`mb-4 hover:shadow-md transition-shadow ${severityColors[risk.severity]}`}>
        <CardContent className="p-5">
          <div className="flex items-start">
            <div className="mr-3 mt-0.5">{severityIcons[risk.severity]}</div>
            <div className="flex-grow">
              <h3 className="font-medium text-lg">{risk.title}</h3>
              <p className="text-muted-foreground text-sm mt-1">{risk.description}</p>
              
              <div className="mt-3 p-3 bg-primary-foreground/50 rounded-md">
                <div className="flex items-start">
                  <Check className="h-4 w-4 text-health-500 mt-0.5 mr-2" />
                  <p className="text-sm">{risk.recommendation}</p>
                </div>
              </div>
              
              <div className="mt-3">
                <Button variant="link" className="text-health-500 p-0 h-auto">
                  View detailed analysis <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-health-50/30">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Predictive Health Alerts</h1>
            <p className="text-muted-foreground text-center mb-10">
              AI-powered analysis to identify potential health risks before they become serious issues
            </p>
          </FadeIn>
          
          <FadeIn delay={100}>
            <div className="bg-card border rounded-lg p-6 mb-8">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-health-100 rounded-full mr-4">
                  <AlertTriangle className="h-6 w-6 text-health-500" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Your Health Risk Assessment</h2>
                  <p className="text-muted-foreground">Last updated: Today, 9:45 AM</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                  <span className="text-sm">High Risk: {highRisks.length}</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-amber-500 mr-2"></div>
                  <span className="text-sm">Moderate Risk: {moderateRisks.length}</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-sm">Low Risk: {lowRisks.length}</span>
                </div>
              </div>
            </div>
          </FadeIn>
          
          <FadeIn delay={200}>
            <Tabs defaultValue="all" className="mb-8">
              <TabsList className="mx-auto">
                <TabsTrigger value="all">All Alerts</TabsTrigger>
                <TabsTrigger value="high">High Risk</TabsTrigger>
                <TabsTrigger value="moderate">Moderate Risk</TabsTrigger>
                <TabsTrigger value="low">Low Risk</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-6">
                <div className="space-y-4">
                  {highRisks.map(renderRiskCard)}
                  {moderateRisks.map(renderRiskCard)}
                  {lowRisks.map(renderRiskCard)}
                </div>
              </TabsContent>
              
              <TabsContent value="high" className="mt-6">
                <div className="space-y-4">
                  {highRisks.map(renderRiskCard)}
                </div>
              </TabsContent>
              
              <TabsContent value="moderate" className="mt-6">
                <div className="space-y-4">
                  {moderateRisks.map(renderRiskCard)}
                </div>
              </TabsContent>
              
              <TabsContent value="low" className="mt-6">
                <div className="space-y-4">
                  {lowRisks.map(renderRiskCard)}
                </div>
              </TabsContent>
            </Tabs>
          </FadeIn>
          
          <FadeIn delay={300}>
            <div className="bg-health-50 rounded-lg p-6">
              <h3 className="text-lg font-medium mb-3">How Our AI Prediction Works</h3>
              <p className="text-muted-foreground mb-4">
                Our advanced AI analyzes your health data, lifestyle patterns, and medical history to 
                predict potential health risks before they become serious issues.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="mb-3 text-health-500 font-semibold">Data Collection</div>
                  <p className="text-sm text-muted-foreground">
                    Securely analyzes your health records, wearable data, and lifestyle information
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="mb-3 text-health-500 font-semibold">Pattern Recognition</div>
                  <p className="text-sm text-muted-foreground">
                    Identifies patterns and trends that may indicate potential health issues
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="mb-3 text-health-500 font-semibold">Personalized Alerts</div>
                  <p className="text-sm text-muted-foreground">
                    Delivers actionable insights and recommendations based on your unique profile
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PredictiveAlerts;
