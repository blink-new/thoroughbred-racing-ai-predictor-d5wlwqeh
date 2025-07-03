import { useState } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './components/ui/resizable';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { ScrollArea } from './components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table';


// Mock Data
const races = [
  { id: 1, track: 'Santa Anita', raceNumber: 3, time: '1:30 PM' },
  { id: 2, track: 'Belmont Park', raceNumber: 5, time: '2:00 PM' },
  { id: 3, track: 'Churchill Downs', raceNumber: 7, time: '3:15 PM' },
  { id: 4, track: 'Keeneland', raceNumber: 2, time: '1:10 PM' },
];

const horses = [
  { id: 1, name: 'Cosmic Glide', odds: '5-2', performanceIndex: 95.5, finalMetric: 8.2 },
  { id: 2, name: 'Ironclad', odds: '3-1', performanceIndex: 92.1, finalMetric: 7.9 },
  { id: 3, name: 'Starlight Sprint', odds: '8-1', performanceIndex: 88.7, finalMetric: 7.5 },
  { id: 4, name: 'Sundown Pacer', odds: '12-1', performanceIndex: 85.3, finalMetric: 7.1 },
];

const formCycle = [
    {
        date: '2023-10-01',
        track: 'SA',
        race: 5,
        distance: '6F',
        surface: 'D',
        condition: 'Fast',
        class: 'MCL $16,000',
        purse: '$16,000',
        finish: 1,
        margin: 'by 2¼',
        jockey: 'J. Rosario',
        trainer: 'B. Baffert',
        weight: 118,
        odds: '3-1',
        fractionalTimes: {
            quarter: '22.15',
            half: '45.32',
            threeQuarter: '1:09.45',
            final: '1:09.45'
        },
        runningLine: {
            start: '4th',
            firstCall: '3rd',
            secondCall: '2nd',
            stretch: '1st',
            finish: '1st'
        },
        beatenLengths: ['-3¼', '-1½', 'hd', 'won'],
        speedFigure: 92,
        paceRating: 88,
        trackVariant: 12,
        comment: 'Rallied strongly in stretch, drew clear'
    },
    {
        date: '2023-09-15',
        track: 'DMR',
        race: 3,
        distance: '6½F',
        surface: 'D',
        condition: 'Fast',
        class: 'MSW',
        purse: '$50,000',
        finish: 3,
        margin: '3¾',
        jockey: 'F. Prat',
        trainer: 'B. Baffert',
        weight: 118,
        odds: '5-2',
        fractionalTimes: {
            quarter: '22.89',
            half: '46.12',
            threeQuarter: '1:10.89',
            final: '1:17.45'
        },
        runningLine: {
            start: '2nd',
            firstCall: '2nd',
            secondCall: '3rd',
            stretch: '3rd',
            finish: '3rd'
        },
        beatenLengths: ['-1', '-2', '-3¾', '-3¾'],
        speedFigure: 88,
        paceRating: 85,
        trackVariant: 8,
        comment: 'Pressed pace, weakened late'
    },
    {
        date: '2023-08-20',
        track: 'DMR',
        race: 8,
        distance: '1 Mile',
        surface: 'D',
        condition: 'Fast',
        class: 'MSW',
        purse: '$50,000',
        finish: 2,
        margin: '½',
        jockey: 'J. Hernandez',
        trainer: 'B. Baffert',
        weight: 118,
        odds: '8-5',
        fractionalTimes: {
            quarter: '23.45',
            half: '46.89',
            threeQuarter: '1:11.23',
            final: '1:37.56'
        },
        runningLine: {
            start: '5th',
            firstCall: '4th',
            secondCall: '3rd',
            stretch: '2nd',
            finish: '2nd'
        },
        beatenLengths: ['-4½', '-3', '-1½', '-½'],
        speedFigure: 90,
        paceRating: 87,
        trackVariant: 15,
        comment: 'Good effort, just missed'
    },
    {
        date: '2023-07-30',
        track: 'SA',
        race: 1,
        distance: '5½F',
        surface: 'D',
        condition: 'Fast',
        class: 'MCL $12,500',
        purse: '$12,500',
        finish: 5,
        margin: '8¼',
        jockey: 'M. Smith',
        trainer: 'B. Baffert',
        weight: 120,
        odds: '9-2',
        fractionalTimes: {
            quarter: '21.98',
            half: '45.67',
            threeQuarter: '1:04.23',
            final: '1:04.23'
        },
        runningLine: {
            start: '1st',
            firstCall: '1st',
            secondCall: '2nd',
            stretch: '4th',
            finish: '5th'
        },
        beatenLengths: ['led', 'hd', '-2', '-6½'],
        speedFigure: 85,
        paceRating: 91,
        trackVariant: 18,
        comment: 'Set pace, tired badly'
    }
];

function App() {
  const [selectedRace, setSelectedRace] = useState(races[0]);
  const [selectedHorse, setSelectedHorse] = useState(horses[0]);

  return (
    <div className="h-screen w-full flex flex-col bg-white text-slate-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-4 py-2 flex items-center justify-between">
        <div className='flex items-center gap-4'>
            <h1 className="text-xl font-bold text-cyan-600">ThoroughbredAI</h1>
            <Badge variant="outline" className='border-cyan-600/50 text-cyan-600'>v1.0.0</Badge>
        </div>
        <div className="text-sm text-slate-600">
            <span>{selectedRace.track} - Race {selectedRace.raceNumber}</span>
        </div>
      </header>

      {/* Main Content */}
      <ResizablePanelGroup direction="horizontal" className="flex-grow">
        
        {/* Left Pane: Race Dashboard */}
        <ResizablePanel defaultSize={20} minSize={15}>
          <ScrollArea className="h-full p-4">
            <h2 className="text-lg font-semibold mb-4 text-slate-700">Today's Races</h2>
            <div className="flex flex-col gap-2">
              {races.map((race) => (
                <div
                  key={race.id}
                  onClick={() => setSelectedRace(race)}
                  className={`p-3 rounded-md cursor-pointer transition-all ${
                    selectedRace.id === race.id ? 'bg-cyan-100 ring-1 ring-cyan-300' : 'bg-white hover:bg-cyan-50'
                  }`}
                >
                  <div className="font-semibold text-slate-900">{race.track}</div>
                  <div className="text-sm text-slate-600">Race {race.raceNumber} - {race.time}</div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Middle Pane: Horse & Predictions */}
        <ResizablePanel defaultSize={50} minSize={30}>
          <ScrollArea className="h-full p-4">
            <h2 className="text-lg font-semibold mb-4 text-slate-700">Horses & Predictions</h2>
            <Card className='bg-white border border-slate-200 shadow-sm'>
                <Table>
                    <TableHeader>
                        <TableRow className='border-slate-200'>
                            <TableHead className='text-slate-700'>Horse</TableHead>
                            <TableHead className='text-slate-700'>Odds</TableHead>
                            <TableHead className='text-slate-700 text-right'>Performance Index</TableHead>
                            <TableHead className='text-slate-700 text-right'>Final Metric</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {horses.map((horse) => (
                            <TableRow 
                                key={horse.id} 
                                onClick={() => setSelectedHorse(horse)}
                                className={`cursor-pointer border-slate-200 hover:bg-cyan-50 ${selectedHorse.id === horse.id ? 'bg-cyan-100' : ''}`}
                            >
                                <TableCell className='font-medium text-slate-900'>{horse.name}</TableCell>
                                <TableCell className='text-slate-700'>{horse.odds}</TableCell>
                                <TableCell className='text-right font-mono text-slate-900'>{horse.performanceIndex.toFixed(1)}</TableCell>
                                <TableCell className='text-right font-mono text-cyan-600'>{horse.finalMetric.toFixed(1)}</TableCell>
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
            
            <div className="space-y-4">
              {formCycle.map((race, index) => (
                <Card key={index} className='bg-white border border-slate-200 shadow-sm'>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className='text-sm font-semibold text-slate-900'>
                          {race.date} - {race.track} R{race.race}
                        </CardTitle>
                        <div className="text-xs text-slate-600 mt-1">
                          {race.distance} {race.surface} - {race.condition} - {race.class}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${race.finish === 1 ? 'text-green-600' : race.finish <= 3 ? 'text-blue-600' : 'text-slate-700'}`}>
                          {race.finish}
                        </div>
                        <div className="text-xs text-slate-600">{race.margin}</div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    {/* Fractional Times */}
                    <div>
                      <div className="text-xs font-semibold text-slate-600 mb-1">FRACTIONAL TIMES</div>
                      <div className="grid grid-cols-4 gap-2 text-xs font-mono">
                        <div>¼: <span className="text-slate-900">{race.fractionalTimes.quarter}</span></div>
                        <div>½: <span className="text-slate-900">{race.fractionalTimes.half}</span></div>
                        <div>¾: <span className="text-slate-900">{race.fractionalTimes.threeQuarter}</span></div>
                        <div>Final: <span className="text-slate-900 font-semibold">{race.fractionalTimes.final}</span></div>
                      </div>
                    </div>

                    {/* Running Line */}
                    <div>
                      <div className="text-xs font-semibold text-slate-600 mb-1">RUNNING LINE</div>
                      <div className="flex justify-between text-xs font-mono bg-slate-50 p-2 rounded">
                        <div className="text-center">
                          <div className="text-slate-600">Start</div>
                          <div className="font-semibold">{race.runningLine.start}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-slate-600">1st Call</div>
                          <div className="font-semibold">{race.runningLine.firstCall}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-slate-600">2nd Call</div>
                          <div className="font-semibold">{race.runningLine.secondCall}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-slate-600">Stretch</div>
                          <div className="font-semibold">{race.runningLine.stretch}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-slate-600">Finish</div>
                          <div className="font-semibold text-cyan-600">{race.runningLine.finish}</div>
                        </div>
                      </div>
                    </div>

                    {/* Race Details */}
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <div className="text-slate-600">Jockey</div>
                        <div className="font-medium">{race.jockey}</div>
                      </div>
                      <div>
                        <div className="text-slate-600">Trainer</div>
                        <div className="font-medium">{race.trainer}</div>
                      </div>
                      <div>
                        <div className="text-slate-600">Weight</div>
                        <div className="font-medium">{race.weight} lbs</div>
                      </div>
                      <div>
                        <div className="text-slate-600">Odds</div>
                        <div className="font-medium">{race.odds}</div>
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="grid grid-cols-3 gap-2 text-xs bg-cyan-50 p-2 rounded">
                      <div className="text-center">
                        <div className="text-slate-600">Speed Fig</div>
                        <div className="font-bold text-cyan-600">{race.speedFigure}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-slate-600">Pace Rating</div>
                        <div className="font-bold text-cyan-600">{race.paceRating}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-slate-600">Track Var</div>
                        <div className="font-bold text-cyan-600">{race.trackVariant}</div>
                      </div>
                    </div>

                    {/* Comment */}
                    <div>
                      <div className="text-xs font-semibold text-slate-600 mb-1">COMMENT</div>
                      <div className="text-xs text-slate-700 italic bg-slate-50 p-2 rounded">
                        {race.comment}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default App;