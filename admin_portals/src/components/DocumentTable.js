import React, { useState, useEffect } from "react";
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Pagination,
  Button,
} from "@windmill/react-ui";
import DocumentPreview from "../pages/DocumentPreview";
import { EyeIcon } from "../icons";

const DocumentTable = ({ documents, resultsPerPage, filter }) => {
  
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [data, setData] = useState([]);

  // Pagination setup
  const totalResults = documents.length;

 
  // Open modal for document preview
  const openPreviewModal = (document) => {
    setSelectedDocument(document);
  };

  // Close modal
  const closePreviewModal = () => {
    setSelectedDocument(null);
  };

  return (
    <div>
      {/* Table */}
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Document Name</TableCell>
              <TableCell>Document Number</TableCell>
              <TableCell>Issued By</TableCell>
              <TableCell>Date of Issue</TableCell>
              <TableCell>Preview</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((document, i) => (
              <TableRow key={i}>
                <TableCell>{document.name}</TableCell>
                <TableCell>{document.number}</TableCell>
                <TableCell>{document.issuedBy}</TableCell>
                <TableCell>{document.date}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => openPreviewModal(document)}
                    size="small"
                    layout="link"
                    icon={EyeIcon}
                    color="red"
                  >
                    
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
      </TableContainer>

      {/* Render the modal if a document is selected */}
      {selectedDocument && (
        <DocumentPreview
          document={selectedDocument}
          onClose={closePreviewModal}
        />
      )}
    </div>
  );
};

export default DocumentTable;