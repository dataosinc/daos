import React, { useState } from 'react';
import SummaryStrip from './SummaryStrip';
import WorkspaceTabs from './WorkspaceTabs';
import CanvasView from './CanvasView';

interface PlaygroundProps {
  onOpenTableInspector: (tableName: string) => void;
  onOpenMetadata: () => void;
}

export default function Playground({ onOpenTableInspector, onOpenMetadata }: PlaygroundProps) {
  const [activeTab, setActiveTab] = useState('360-view');

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <SummaryStrip onOpenMetadata={onOpenMetadata} />
      <WorkspaceTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 overflow-hidden">
        <CanvasView activeView={activeTab} onOpenTableInspector={onOpenTableInspector} />
      </div>
    </div>
  );
}