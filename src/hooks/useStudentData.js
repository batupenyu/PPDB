import { useState, useEffect, useCallback } from 'react';

const API_BASE = '/api';

export const useStudentData = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all students from API
  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE}/students`);
      if (!response.ok) throw new Error('Failed to fetch students');
      const data = await response.json();
      setStudents(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching students:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load students on mount
  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // Add new student or update existing via API
  const addStudent = useCallback(async (data) => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE}/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to save student');
      }

      await fetchStudents();
      return true;
    } catch (err) {
      setError(err.message);
      console.error('Error saving student:', err);
      return false;
    }
  }, [fetchStudents]);

  // Delete student via API
  const deleteStudent = useCallback(async (id) => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE}/students/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to delete student');
      }

      await fetchStudents();
    } catch (err) {
      setError(err.message);
      console.error('Error deleting student:', err);
    }
  }, [fetchStudents]);

  // Get single student (from current state)
  const getStudent = useCallback((id) => {
    return students.find(s => s._id === id);
  }, [students]);

   // Get statistics from API
   const getStats = useCallback(async () => {
     try {
       const response = await fetch(`${API_BASE}/stats`);
       if (!response.ok) throw new Error('Failed to fetch stats');
       return await response.json();
     } catch (err) {
       console.error('Error fetching stats:', err);
       return { total: students.length, today: 0, recent: 0 };
     }
   }, [students.length]);

   // Get jurusan counts
   const getJurusanStats = useCallback(async () => {
     try {
       const response = await fetch(`${API_BASE}/stats/jurusan`);
       if (!response.ok) throw new Error('Failed to fetch jurusan stats');
       return await response.json();
     } catch (err) {
       console.error('Error fetching jurusan stats:', err);
       return [];
     }
   }, []);

   // Clear all data
  const clearAll = useCallback(async () => {
    setStudents([]);
  }, []);

  return {
    students,
    loading,
    error,
    addStudent,
    deleteStudent,
    getStudent,
    getStats,
    getJurusanStats,
    clearAll,
    refresh: fetchStudents
  };
};
