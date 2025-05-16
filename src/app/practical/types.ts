// Types for notebook structures and other interfaces

// Notebook cell structure
export interface NotebookCell {
  cell_type: string;
  execution_count: number | null;
  metadata: Record<string, any>;
  outputs: any[];
  source: string[];
}

// Notebook kernel specification
export interface NotebookKernelspec {
  display_name: string;
  language: string;
  name: string;
}

// Notebook language information
export interface NotebookLanguageInfo {
  name: string;
}

// Notebook metadata structure
export interface NotebookMetadata {
  kernelspec: NotebookKernelspec;
  language_info: NotebookLanguageInfo;
}

// Complete notebook JSON structure
export interface NotebookJSON {
  cells: NotebookCell[];
  metadata: NotebookMetadata;
  nbformat: number;
  nbformat_minor: number;
}
