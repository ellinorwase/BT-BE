import { Request, Response } from 'express';
import { mockChild, updateChild } from '../utils/data';
import { Child, CreateChildRequest } from '../types';

export const getChild = async (req: Request, res: Response) => {
  try {
    console.log('API: Fetching child data');
    
    setTimeout(() => {
      res.json(mockChild);
    }, 300);
  } catch (error) {
    console.error('Error fetching child:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createChild = async (req: Request<{}, Child, CreateChildRequest>, res: Response) => {
  try {
    console.log('API: Creating child', req.body);
    
    const newChild: Child = {
      ...req.body,
      id: Date.now().toString()
    };
    
    setTimeout(() => {
      updateChild(newChild);
      res.status(201).json(newChild);
    }, 600);
  } catch (error) {
    console.error('Error creating child:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateChildData = async (req: Request<{}, Child, Child>, res: Response) => {
  try {
    console.log('API: Updating child data', req.body);
    
    setTimeout(() => {
      updateChild(req.body);
      res.json(mockChild);
    }, 500);
  } catch (error) {
    console.error('Error updating child:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};