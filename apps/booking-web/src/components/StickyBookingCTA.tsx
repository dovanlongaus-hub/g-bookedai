'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface StickyBookingCTAProps {
  visible: boolean;
  serviceName: string;
  price: string;
  date?: string;
  onContinue: () => void;
  buttonLabel?: string;
}

export function StickyBookingCTA({
  visible,
  serviceName,
  price,
  date,
  onContinue,
  buttonLabel = 'Continue',
}: StickyBookingCTAProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="sticky-cta"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className="sticky-cta__inner">
            <div className="sticky-cta__info">
              <span className="sticky-cta__price">{price}</span>
              <span className="sticky-cta__service">{serviceName}</span>
              {date && <span className="sticky-cta__date">{date}</span>}
            </div>
            <Button
              className="sticky-cta__button"
              onClick={onContinue}
              size="lg"
            >
              {buttonLabel}
              <ArrowRight size={16} />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
