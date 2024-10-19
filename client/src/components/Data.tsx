export interface SearchItem {
  query: string;
  info: string;
  description?: string;
}

export const mockData: SearchItem[] = [
  { query: 'Quantum computing', info: 'Quantum computing uses quantum bits (qubits) to process information in ways classical computers can\'t. It leverages superposition and entanglement to solve complex problems faster, with potential impacts on cryptography, optimization, and simulations.', description: 'technology' },
  { query: 'Sustainable energy', info: 'Sustainable energy focuses on renewable sources like solar, wind, and hydropower to reduce environmental impact and ensure long-term availability.', description: '' },
  { query: 'Artificial intelligence', info: 'Artificial intelligence enables machines to learn and make decisions, simulating human intelligence to enhance automation, problem-solving, and innovation.', description: 'machine learning and language models' },
  { query: 'Space exploration', info: 'Space exploration involves studying outer space through missions and technology. It expands knowledge of the universe, drives scientific discovery, and inspires advancements in technology and international cooperation.', description: 'Space-x' },
  { query: 'Biotechnology advancements', info: 'Biotechnology advancements enhance medical treatments, agriculture, and environmental solutions through genetic engineering and innovative biological processes.', description: '' },
  { query: 'Cybersecurity measures', info: 'Cybersecurity measures protect systems from threats by using encryption, firewalls, and monitoring to safeguard data and ensure online safety.', description: 'Malware' },
  { query: 'Virtual reality applications', info: 'Virtual reality applications immerse users in digital environments for gaming, training, therapy, and education, providing interactive and realistic experiences that enhance learning and engagement.', description: '' }
];
