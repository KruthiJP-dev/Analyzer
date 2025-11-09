import React from 'react';
import type { ComponentNode } from '../../types';

interface ComponentHierarchyDisplayProps {
  tree: ComponentNode;
}

const TreeNode: React.FC<{ node: ComponentNode, isLast: boolean }> = ({ node, isLast }) => {
  return (
    <li className="relative">
      {/* Vertical line connecting nodes */}
      {!isLast && <span className="absolute left-0 top-5 -ml-px h-full w-0.5 bg-gray-700" aria-hidden="true" />}
      
      <div className="relative flex items-start space-x-3">
        {/* Branching line */}
        <div className="relative px-1">
          <div className="h-8 w-8 rounded-full bg-gray-800 ring-4 ring-gray-900 flex items-center justify-center">
             <div
              className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-purple-400 [&>svg]:w-5 [&>svg]:h-5"
              dangerouslySetInnerHTML={{ __html: node.svgIcon }}
            />
          </div>
        </div>
        <div className="min-w-0 flex-1 py-1.5">
          <div className="text-md text-white font-semibold">{node.name}</div>
        </div>
      </div>

      {node.children && node.children.length > 0 && (
        <ul className="ml-6 pl-6 border-l border-gray-700">
          {node.children.map((child, index) => (
            <TreeNode key={child.name + index} node={child} isLast={index === node.children.length - 1} />
          ))}
        </ul>
      )}
    </li>
  );
};


export const ComponentHierarchyDisplay: React.FC<ComponentHierarchyDisplayProps> = ({ tree }) => {
  if (!tree || !tree.name) {
    return <p className="text-gray-400">Component hierarchy data not available.</p>;
  }

  return (
    <div className="flow-root">
      <ul>
        <TreeNode node={tree} isLast={true} />
      </ul>
    </div>
  );
};