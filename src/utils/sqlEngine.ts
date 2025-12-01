import resumeData from '@/data/resume.json';

export interface QueryResult {
  success: boolean;
  data: any[];
  message: string;
  columns: string[];
}

interface Database {
  projects: any[];
  skills: any[];
  experience: any[];
  education: any[];
  certifications: any[];
}

export const createMockDatabase = (): Database => {
  // Transform resume data into database tables
  const projects = resumeData.projects.map((project, id) => ({
    id: id + 1,
    title: project.title,
    period: project.period,
    description: project.description,
    technologies: project.technologies.join(', '),
    metrics: project.metrics,
    highlights: project.highlights.join(' | '),
  }));

  const skills = [
    ...resumeData.skills.languages.map((name, id) => ({
      id: id + 1,
      name,
      category: 'Languages',
      proficiency: name === 'Python' ? 90 : 85,
    })),
    ...resumeData.skills.libraries.map((name, id) => ({
      id: id + 10,
      name,
      category: 'Libraries',
      proficiency: name === 'Pandas' ? 85 : 80,
    })),
    ...resumeData.skills.databases.map((name, id) => ({
      id: id + 20,
      name,
      category: 'Databases',
      proficiency: 85,
    })),
    ...resumeData.skills.tools.map((name, id) => ({
      id: id + 30,
      name,
      category: 'Tools',
      proficiency: name === 'Power BI' ? 90 : 80,
    })),
    ...resumeData.skills.techniques.map((name, id) => ({
      id: id + 40,
      name,
      category: 'Techniques',
      proficiency: name === 'EDA' ? 90 : 85,
    })),
  ];

  const experience = resumeData.experience.map((exp, id) => ({
    id: id + 1,
    role: exp.role,
    company: exp.company,
    period: exp.period,
    start_date: exp.period.split('–')[0].trim(),
    end_date: exp.period.split('–')[1]?.trim() || 'Present',
    achievements: exp.achievements.join(' | '),
  }));

  const education = resumeData.education.map((edu, id) => ({
    id: id + 1,
    degree: edu.degree,
    institution: edu.institution,
    period: edu.period,
    grade: edu.grade,
  }));

  const certifications = resumeData.certifications.map((cert, id) => ({
    id: id + 1,
    name: cert.name,
    issuer: cert.issuer,
    year: cert.year,
  }));

  return { projects, skills, experience, education, certifications };
};

const parseSimpleSelect = (query: string, db: Database): QueryResult => {
  const normalizedQuery = query.trim().replace(/\s+/g, ' ').toUpperCase();
  
  // Extract table name
  const fromMatch = normalizedQuery.match(/FROM\s+(\w+)/);
  if (!fromMatch) {
    return {
      success: false,
      data: [],
      message: 'Invalid query: Missing FROM clause',
      columns: [],
    };
  }

  const tableName = fromMatch[1].toLowerCase();
  
  // Check if table exists
  if (!(tableName in db)) {
    return {
      success: false,
      data: [],
      message: `Table '${tableName}' does not exist. Available tables: projects, skills, experience, education, certifications`,
      columns: [],
    };
  }

  let data = (db as any)[tableName];
  
  // Handle WHERE clause
  const whereMatch = normalizedQuery.match(/WHERE\s+(.+?)(?:ORDER|GROUP|LIMIT|;|$)/);
  if (whereMatch) {
    const whereClause = whereMatch[1].trim();
    
    // Simple equality condition
    const eqMatch = whereClause.match(/(\w+)\s*=\s*'([^']+)'|(\w+)\s*=\s*(\d+)/);
    if (eqMatch) {
      const column = (eqMatch[1] || eqMatch[3]).toLowerCase();
      const value = eqMatch[2] || eqMatch[4];
      data = data.filter((row: any) => String(row[column]).toLowerCase() === value.toLowerCase());
    }
    
    // Simple > condition
    const gtMatch = whereClause.match(/(\w+)\s*>\s*(\d+)/);
    if (gtMatch) {
      const column = gtMatch[1].toLowerCase();
      const value = parseFloat(gtMatch[2]);
      data = data.filter((row: any) => parseFloat(row[column]) > value);
    }
    
    // Simple < condition
    const ltMatch = whereClause.match(/(\w+)\s*<\s*(\d+)/);
    if (ltMatch) {
      const column = ltMatch[1].toLowerCase();
      const value = parseFloat(ltMatch[2]);
      data = data.filter((row: any) => parseFloat(row[column]) < value);
    }
  }

  // Handle ORDER BY clause
  const orderMatch = normalizedQuery.match(/ORDER\s+BY\s+(\w+)(?:\s+(ASC|DESC))?/);
  if (orderMatch) {
    const column = orderMatch[1].toLowerCase();
    const direction = orderMatch[2] || 'ASC';
    data = [...data].sort((a: any, b: any) => {
      const aVal = a[column];
      const bVal = b[column];
      if (typeof aVal === 'string') {
        return direction === 'ASC' 
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      return direction === 'ASC' ? aVal - bVal : bVal - aVal;
    });
  }

  // Handle LIMIT clause
  const limitMatch = normalizedQuery.match(/LIMIT\s+(\d+)/);
  if (limitMatch) {
    const limit = parseInt(limitMatch[1]);
    data = data.slice(0, limit);
  }

  // Extract columns
  const selectMatch = normalizedQuery.match(/SELECT\s+(.+?)\s+FROM/);
  if (!selectMatch) {
    return {
      success: false,
      data: [],
      message: 'Invalid query: Missing SELECT clause',
      columns: [],
    };
  }

  const selectClause = selectMatch[1].trim();
  let columns: string[];
  
  if (selectClause === '*') {
    columns = data.length > 0 ? Object.keys(data[0]) : [];
  } else {
    columns = selectClause.split(',').map(col => col.trim().toLowerCase());
    data = data.map((row: any) => {
      const newRow: any = {};
      columns.forEach(col => {
        newRow[col] = row[col];
      });
      return newRow;
    });
  }

  return {
    success: true,
    data,
    message: data.length === 0 ? 'Query executed successfully. No rows returned.' : '',
    columns,
  };
};

export const executeSqlQuery = (query: string): QueryResult => {
  const db = createMockDatabase();
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return {
      success: false,
      data: [],
      message: 'Empty query',
      columns: [],
    };
  }

  // Handle SHOW TABLES
  if (trimmedQuery.toUpperCase().includes('SHOW TABLES')) {
    return {
      success: true,
      data: Object.keys(db).map(table => ({ table_name: table })),
      message: '',
      columns: ['table_name'],
    };
  }

  // Handle DESCRIBE
  const descMatch = trimmedQuery.toUpperCase().match(/DESCRIBE\s+(\w+)|DESC\s+(\w+)/);
  if (descMatch) {
    const tableName = (descMatch[1] || descMatch[2]).toLowerCase();
    if (!(tableName in db)) {
      return {
        success: false,
        data: [],
        message: `Table '${tableName}' does not exist`,
        columns: [],
      };
    }
    const sampleRow = (db as any)[tableName][0];
    const columns = Object.keys(sampleRow).map(col => ({
      column_name: col,
      type: typeof sampleRow[col],
    }));
    return {
      success: true,
      data: columns,
      message: '',
      columns: ['column_name', 'type'],
    };
  }

  // Handle SELECT queries
  if (trimmedQuery.toUpperCase().startsWith('SELECT')) {
    return parseSimpleSelect(trimmedQuery, db);
  }

  // Handle COUNT
  if (trimmedQuery.toUpperCase().includes('COUNT(')) {
    const fromMatch = trimmedQuery.toUpperCase().match(/FROM\s+(\w+)/);
    if (fromMatch) {
      const tableName = fromMatch[1].toLowerCase();
      if (tableName in db) {
        return {
          success: true,
          data: [{ count: (db as any)[tableName].length }],
          message: '',
          columns: ['count'],
        };
      }
    }
  }

  return {
    success: false,
    data: [],
    message: 'Unsupported query. Try SELECT, SHOW TABLES, or DESCRIBE statements.',
    columns: [],
  };
};