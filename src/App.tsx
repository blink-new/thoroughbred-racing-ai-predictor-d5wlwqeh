import { useState } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './components/ui/resizable';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { ScrollArea } from './components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table';
import { Separator } from './components/ui/separator';
import { Button } from './components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './components/ui/dialog';
import { Eye, TrendingUp, Clock, MapPin } from 'lucide-react';

// Enhanced Mock Data
const races = [
  { id: 1, track: 'Santa Anita', raceNumber: 3, time: '1:30 PM', distance: '6f', surface: 'Dirt' },
  { id: 2, track: 'Belmont Park', raceNumber: 5, time: '2:00 PM', distance: '1m', surface: 'Turf' },
  { id: 3, track: 'Churchill Downs', raceNumber: 7, time: '3:15 PM', distance: '1 1/16m', surface: 'Dirt' },
  { id: 4, track: 'Keeneland', raceNumber: 2, time: '1:10 PM', distance: '7f', surface: 'Dirt' },
];

const horses = [
  { id: 1, name: 'Cosmic Glide', odds: '5-2', performanceIndex: 95.5, finalMetric: 8.2, jockey: 'J. Castellano', trainer: 'C. McGaughey' },
  { id: 2, name: 'Ironclad', odds: '3-1', performanceIndex: 92.1, finalMetric: 7.9, jockey: 'I. Ortiz Jr.', trainer: 'T. Pletcher' },
  { id: 3, name: 'Starlight Sprint', odds: '8-1', performanceIndex: 88.7, finalMetric: 7.5, jockey: 'J. Rosario', trainer: 'B. Cox' },
  { id: 4, name: 'Sundown Pacer', odds: '12-1', performanceIndex: 85.3, finalMetric: 7.1, jockey: 'L. Saez', trainer: 'S. Asmussen' },
];

// Enhanced past performance data
const pastPerformances = {
  1: [
    { date: '2023-10-01', track: 'Santa Anita', race: 5, class: 'MCL $40,000', distance: '6f', surface: 'Dirt', finish: 1, lengths: 'Won by 2¼', time: '1:10.23', speed: 92, pace: 'E', jockey: 'J. Castellano', weight: 118, odds: '3-1', purse: '$40,000' },
    { date: '2023-09-15', track: 'Del Mar', race: 3, class: 'MSW', distance: '6f', surface: 'Dirt', finish: 3, lengths: '3rd by 1½', time: '1:11.45', speed: 88, pace: 'P', jockey: 'J. Castellano', weight: 118, odds: '5-2', purse: '$60,000' },
    { date: '2023-08-20', track: 'Del Mar', race: 8, class: 'MSW', distance: '5½f', surface: 'Dirt', finish: 2, lengths: '2nd by ¾', time: '1:04.67', speed: 90, pace: 'E', jockey: 'F. Prat', weight: 118, odds: '7-2', purse: '$55,000' },
    { date: '2023-07-30', track: 'Santa Anita', race: 1, class: 'MCL $25,000', distance: '6f', surface: 'Dirt', finish: 5, lengths: '5th by 6¼', time: '1:12.89', speed: 85, pace: 'L', jockey: 'J. Castellano', weight: 116, odds: '8-1', purse: '$25,000' },
  ],
  2: [
    { date: '2023-09-28', track: 'Belmont Park', race: 7, class: 'ALW $75,000', distance: '1m', surface: 'Dirt', finish: 1, lengths: 'Won by 1¼', time: '1:36.45', speed: 95, pace: 'P', jockey: 'I. Ortiz Jr.', weight: 120, odds: '2-1', purse: '$75,000' },
    { date: '2023-09-10', track: 'Saratoga', race: 4, class: 'MSW', distance: '1m', surface: 'Dirt', finish: 2, lengths: '2nd by ½', time: '1:37.23', speed: 92, pace: 'E', jockey: 'I. Ortiz Jr.', weight: 118, odds: '9-5', purse: '$80,000' },
    { date: '2023-08-15', track: 'Saratoga', race: 6, class: 'MSW', distance: '7f', surface: 'Dirt', finish: 3, lengths: '3rd by 2¾', time: '1:23.78', speed: 88, pace: 'L', jockey: 'I. Ortiz Jr.', weight: 118, odds: '3-1', purse: '$70,000' },
  ]
};

interface Horse {
  id: number;
  name: string;
  odds: string;
  performanceIndex: number;
  finalMetric: number;
  jockey: string;
  trainer: string;
}

function PastPerformanceModal({ horse, isOpen, onClose }: { horse: Horse, isOpen: boolean, onClose: () => void }) {
  const performances = pastPerformances[horse.id as keyof typeof pastPerformances] || [];
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-cyan-600" />
            Past Performances - {horse.name}
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[70vh] pr-4">
          <div className="space-y-4">
            {/* Horse Summary */}
            <Card className="bg-cyan-50 border-cyan-200">
              <CardContent className="pt-4">
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-slate-600">Jockey:</span>
                    <div className="font-medium">{horse.jockey}</div>
                  </div>
                  <div>
                    <span className="text-slate-600">Trainer:</span>
                    <div className="font-medium">{horse.trainer}</div>
                  </div>
                  <div>
                    <span className="text-slate-600">Current Odds:</span>
                    <div className="font-bold text-cyan-600">{horse.odds}</div>
                  </div>
                  <div>
                    <span className="text-slate-600">Performance Index:</span>
                    <div className="font-bold text-slate-900">{horse.performanceIndex.toFixed(1)}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Past Performance Table */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base text-slate-900">Race History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-200">
                        <TableHead className="text-slate-700">Date</TableHead>
                        <TableHead className="text-slate-700">Track</TableHead>
                        <TableHead className="text-slate-700">Class</TableHead>
                        <TableHead className="text-slate-700">Dist.</TableHead>
                        <TableHead className="text-slate-700">Finish</TableHead>
                        <TableHead className="text-slate-700">Time</TableHead>
                        <TableHead className="text-slate-700">Speed</TableHead>
                        <TableHead className="text-slate-700">Pace</TableHead>
                        <TableHead className="text-slate-700">Odds</TableHead>
                        <TableHead className="text-slate-700">Purse</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {performances.map((perf, index) => (
                        <TableRow key={index} className="border-slate-200 hover:bg-slate-50">
                          <TableCell className="font-mono text-sm">{perf.date}</TableCell>
                          <TableCell className="text-sm">{perf.track}</TableCell>
                          <TableCell className="text-sm">{perf.class}</TableCell>
                          <TableCell className="text-sm">{perf.distance}</TableCell>
                          <TableCell className={`font-bold ${perf.finish <= 3 ? 'text-green-600' : 'text-slate-600'}`}>
                            {perf.lengths}
                          </TableCell>
                          <TableCell className="font-mono text-sm">{perf.time}</TableCell>
                          <TableCell className="font-bold text-cyan-600">{perf.speed}</TableCell>
                          <TableCell className={`font-bold ${perf.pace === 'E' ? 'text-red-500' : perf.pace === 'P' ? 'text-blue-500' : 'text-green-500'}`}>
                            {perf.pace}
                          </TableCell>
                          <TableCell className="text-sm">{perf.odds}</TableCell>
                          <TableCell className="text-sm">{perf.purse}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Performance Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm text-slate-700">Speed Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-cyan-600">
                    {performances.length > 0 ? Math.max(...performances.map(p => p.speed)) : 'N/A'}
                  </div>
                  <p className="text-xs text-slate-600">Best Speed Figure</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm text-slate-700">Win Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {performances.length > 0 ? Math.round((performances.filter(p => p.finish === 1).length / performances.length) * 100) : 0}%
                  </div>
                  <p className="text-xs text-slate-600">Last {performances.length} Races</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm text-slate-700">In The Money</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {performances.length > 0 ? Math.round((performances.filter(p => p.finish <= 3).length / performances.length) * 100) : 0}%
                  </div>
                  <p className="text-xs text-slate-600">Top 3 Finishes</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

function App() {
  const [selectedRace, setSelectedRace] = useState(races[0]);
  const [selectedHorse, setSelectedHorse] = useState(horses[0]);
  const [ppModalOpen, setPpModalOpen] = useState(false);
  const [ppModalHorse, setPpModalHorse] = useState(horses[0]);

  const openPastPerformanceModal = (horse: Horse) => {
    setPpModalHorse(horse);
    setPpModalOpen(true);
  };

  return (
    <div className="h-screen w-full flex flex-col bg-white text-slate-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className='flex items-center gap-4'>
            <h1 className="text-xl font-bold text-cyan-600">ThoroughbredAI</h1>
            <Badge variant="outline" className='border-cyan-600/50 text-cyan-600'>v1.0.0</Badge>
        </div>
        <div className="text-sm text-slate-600 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{selectedRace.track} - Race {selectedRace.raceNumber} • {selectedRace.distance} • {selectedRace.surface}</span>
        </div>
      </header>

      {/* Main Content */}
      <ResizablePanelGroup direction="horizontal" className="flex-grow">
        
        {/* Left Pane: Race Dashboard */}
        <ResizablePanel defaultSize={20} minSize={15}>
          <ScrollArea className="h-full p-4">
            <h2 className="text-lg font-semibold mb-4 text-slate-700 flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Today's Races
            </h2>
            <div className="flex flex-col gap-2">
              {races.map((race) => (
                <div
                  key={race.id}
                  onClick={() => setSelectedRace(race)}
                  className={`p-3 rounded-lg cursor-pointer transition-all border ${
                    selectedRace.id === race.id ? 'bg-cyan-100 ring-1 ring-cyan-300 border-cyan-200' : 'bg-white hover:bg-cyan-50 border-slate-200'
                  }`}
                >
                  <div className="font-semibold text-slate-900">{race.track}</div>
                  <div className="text-sm text-slate-600">Race {race.raceNumber} - {race.time}</div>
                  <div className="text-xs text-slate-500">{race.distance} • {race.surface}</div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Middle Pane: Horse & Predictions */}
        <ResizablePanel defaultSize={50} minSize={30}>
          <ScrollArea className="h-full p-4">
            <h2 className="text-lg font-semibold mb-4 text-slate-700 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Horses & Predictions
            </h2>
            <Card className='bg-white border border-slate-200 shadow-sm'>
                <Table>
                    <TableHeader>
                        <TableRow className='border-slate-200'>
                            <TableHead className='text-slate-700'>Horse</TableHead>
                            <TableHead className='text-slate-700'>Odds</TableHead>
                            <TableHead className='text-slate-700 text-right'>Performance Index</TableHead>
                            <TableHead className='text-slate-700 text-right'>Final Metric</TableHead>
                            <TableHead className='text-slate-700 text-center'>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {horses.map((horse) => (
                            <TableRow 
                                key={horse.id} 
                                onClick={() => setSelectedHorse(horse)}
                                className={`cursor-pointer border-slate-200 hover:bg-cyan-50 ${selectedHorse.id === horse.id ? 'bg-cyan-100' : ''}`}
                            >
                                <TableCell className='font-medium text-slate-900'>
                                  <div>
                                    <div>{horse.name}</div>
                                    <div className="text-xs text-slate-500">{horse.jockey} • {horse.trainer}</div>
                                  </div>
                                </TableCell>
                                <TableCell className='text-slate-700 font-semibold'>{horse.odds}</TableCell>
                                <TableCell className='text-right font-mono text-slate-900'>{horse.performanceIndex.toFixed(1)}</TableCell>
                                <TableCell className='text-right font-mono text-cyan-600 font-bold'>{horse.finalMetric.toFixed(1)}</TableCell>
                                <TableCell className='text-center'>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      openPastPerformanceModal(horse);
                                    }}
                                    className="text-cyan-600 border-cyan-200 hover:bg-cyan-50"
                                  >
                                    <Eye className="h-4 w-4 mr-1" />
                                    PP
                                  </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
          </ScrollArea>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Right Pane: Form Cycle */}
        <ResizablePanel defaultSize={30} minSize={20}>
          <ScrollArea className="h-full p-4">
            <h2 className="text-lg font-semibold mb-4 text-slate-700">Form Cycle: {selectedHorse.name}</h2>
            <Card className='bg-white border border-slate-200 shadow-sm'>
                <CardHeader>
                    <CardTitle className='text-base text-slate-900'>Recent Performances</CardTitle>
                </CardHeader>
                <CardContent>
                    {(pastPerformances[selectedHorse.id as keyof typeof pastPerformances] || []).slice(0, 4).map((race, index) => (
                        <div key={index}>
                            <div className="grid grid-cols-4 gap-4 text-sm mb-2">
                                <div>
                                    <div className='text-slate-600'>Date</div>
                                    <div className="font-mono">{race.date}</div>
                                </div>
                                <div>
                                    <div className='text-slate-600'>Track</div>
                                    <div>{race.track}</div>
                                </div>
                                <div>
                                    <div className='text-slate-600'>Class</div>
                                    <div>{race.class.split(' ')[0]}</div>
                                </div>
                                <div className='text-right'>
                                    <div className='text-slate-600'>Finish</div>
                                    <div className={`font-bold text-lg ${race.finish <= 3 ? 'text-green-600' : 'text-slate-600'}`}>{race.finish}</div>
                                </div>
                            </div>
                            <div className='flex justify-between text-xs'>
                              <span className={`font-mono px-2 py-1 rounded ${race.pace === 'E' ? 'bg-red-100 text-red-600' : race.pace === 'P' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                                Pace: {race.pace}
                              </span>
                              <span className='font-mono text-cyan-600'>Speed: {race.speed}</span>
                            </div>
                            {index < 3 && <Separator className='my-4 bg-slate-200' />}
                        </div>
                    ))}
                    <div className="mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openPastPerformanceModal(selectedHorse)}
                        className="w-full text-cyan-600 border-cyan-200 hover:bg-cyan-50"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Full Past Performances
                      </Button>
                    </div>
                </CardContent>
            </Card>
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>

      {/* Past Performance Modal */}
      <PastPerformanceModal 
        horse={ppModalHorse} 
        isOpen={ppModalOpen} 
        onClose={() => setPpModalOpen(false)} 
      />
    </div>
  );
}

export default App;