import React, { useState } from 'react';

function DocumentPreview({ imagePreview, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-auto max-w-3xl mx-auto my-6">
        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
          {/* Header */}
          <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 className="text-3xl font-semibold">Document Preview</h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={onClose}
            >
              <span className="text-black opacity-50">×</span>
            </button>
          </div>
          {/* Content */}
          <div className="relative p-6 flex-auto">
            <img src={imagePreview} alt="Preview" className="max-w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocumentPreview;