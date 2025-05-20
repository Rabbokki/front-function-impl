import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './Dialog';

export function ReportUserForm({ isOpen, onClose, reportingUserId, reportedUserId, onReportSubmitted }) {
  const dispatch = useDispatch();



  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        USER REPORT TIME
      <DialogContent>
        You are now about to report the user!
        <DialogHeader>
            REPORT USER
          <DialogTitle>
            Report user?
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
      <DialogFooter>
        Done reporting user
      </DialogFooter>
    </Dialog>
  )
}