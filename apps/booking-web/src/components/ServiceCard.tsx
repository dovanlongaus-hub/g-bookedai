'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Clock, Star, Check, Info, BookOpen, Target, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

interface ServiceCardProps {
  name: string;
  price: string;
  originalPrice?: string;
  duration: string;
  features: string[];
  badge?: string;
  badgeColor?: string;
  icon?: string;
  selected: boolean;
  onClick: () => void;
  illustration?: React.FC;
  imageUrl?: string;
  shortDescription?: string;
  rating?: number;
  location?: string;
  details?: string;
  curriculum?: string[];
  includes?: string[];
  nextCourse?: { name: string; reason: string };
}

export function ServiceCard({
  name,
  price,
  originalPrice,
  duration,
  features,
  badge,
  badgeColor,
  selected,
  onClick,
  illustration: Illustration,
  imageUrl,
  shortDescription,
  rating,
  location,
  details,
  curriculum,
  includes,
  nextCourse,
}: ServiceCardProps) {
  const [open, setOpen] = useState(false);

  const badgeStyle =
    badge === 'MOST POPULAR'
      ? { background: '#0369A1', color: '#fff', border: 'none' }
      : badge === 'BEST VALUE'
      ? { background: '#059669', color: '#fff', border: 'none' }
      : badge === 'PREMIUM'
      ? { background: 'linear-gradient(135deg, #ec4899, #8b5cf6)', color: '#fff', border: 'none' }
      : badgeColor
      ? { background: badgeColor, color: '#fff', border: 'none' }
      : undefined;

  const description = shortDescription || features[0] || '';

  const handleSelect = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    onClick();
  };

  const openDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(true);
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
        className="h-full"
      >
        <Card
          role="button"
          tabIndex={0}
          aria-pressed={selected}
          onClick={onClick}
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onClick();
            }
          }}
          className={[
            'h-full flex flex-col cursor-pointer overflow-hidden p-0 gap-0',
            'bg-white border border-slate-200 rounded-2xl ring-0',
            'transition-colors duration-200',
            'hover:border-sky-300 hover:shadow-lg hover:shadow-sky-100/50',
            selected ? 'border-sky-600 ring-2 ring-sky-600/20 shadow-lg shadow-sky-100/50' : '',
          ].join(' ')}
        >
          {/* === THUMBNAIL === */}
          <div className="relative w-full aspect-[16/10] overflow-hidden bg-gradient-to-br from-sky-50 to-emerald-50">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : Illustration ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[40%] max-w-[160px] opacity-90">
                  <Illustration />
                </div>
              </div>
            ) : null}

            {badge && (
              <Badge
                className="absolute top-3 right-3 z-10 text-[0.62rem] font-bold tracking-wide uppercase shadow-md"
                style={badgeStyle}
              >
                {badge}
              </Badge>
            )}

            {selected && (
              <div className="absolute top-3 left-3 z-10 flex items-center gap-1 rounded-full bg-sky-600 px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-wide text-white">
                <Check size={11} />
                Selected
              </div>
            )}
          </div>

          {/* === BODY === */}
          <div className="flex flex-1 flex-col gap-3 p-5">
            <div>
              <h3 className="font-heading text-[18px] font-semibold leading-tight text-slate-900">
                {name}
              </h3>
              {description && (
                <p className="mt-1 text-[14px] text-slate-500 line-clamp-1">
                  {description}
                </p>
              )}
            </div>

            {/* Meta rows */}
            <div className="flex flex-col gap-1.5 text-[13px] text-slate-500">
              {duration && (
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-slate-400" />
                  <span>{duration}</span>
                </div>
              )}
              {typeof rating === 'number' && rating > 0 && (
                <div className="flex items-center gap-2">
                  <Star size={14} className="text-amber-500" />
                  <span>{rating.toFixed(1)}</span>
                </div>
              )}
              {location && (
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-slate-400" />
                  <span>{location}</span>
                </div>
              )}
            </div>

            {/* Footer pricing + actions */}
            <div className="mt-auto flex items-center justify-between gap-2 pt-3">
              <div className="flex items-baseline gap-1.5">
                <span className="font-heading text-[20px] font-bold text-slate-900 leading-none">
                  {price}
                </span>
                <span className="text-[12px] text-slate-400">AUD</span>
                {originalPrice && (
                  <span className="text-[12px] text-slate-400 line-through">
                    {originalPrice}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="h-9 w-9 text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                  onClick={openDetails}
                  aria-label="More details"
                >
                  <Info size={16} />
                </Button>
                <Button
                  size="lg"
                  className="h-9 rounded-lg bg-sky-700 px-4 text-[13px] font-semibold text-white hover:bg-sky-600 shadow-sm"
                  onClick={handleSelect}
                  onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      e.stopPropagation();
                      onClick();
                    }
                  }}
                >
                  {selected ? (
                    <>
                      <Check size={14} />
                      Selected
                    </>
                  ) : (
                    'Select'
                  )}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* === DETAILS DIALOG === */}
      <Dialog open={open} onOpenChange={(next: boolean) => setOpen(next)}>
        <DialogContent
          className="max-w-lg w-[calc(100%-2rem)] max-h-[85vh] overflow-y-auto bg-white text-slate-900 ring-1 ring-slate-200 p-0"
        >
          {/* Hero */}
          <div className="relative w-full aspect-[16/9] overflow-hidden bg-gradient-to-br from-sky-50 to-emerald-50 rounded-t-xl">
            {imageUrl ? (
              <img src={imageUrl} alt={name} className="absolute inset-0 w-full h-full object-cover" />
            ) : Illustration ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[40%] max-w-[200px] opacity-90">
                  <Illustration />
                </div>
              </div>
            ) : null}
          </div>

          <div className="px-5 pb-5 pt-3">
            <DialogHeader className="gap-1.5">
              <DialogTitle className="font-heading text-[20px] font-semibold text-slate-900">
                {name}
              </DialogTitle>
              {details && (
                <DialogDescription className="text-[14px] text-slate-600 leading-relaxed">
                  {details}
                </DialogDescription>
              )}
            </DialogHeader>

            <div className="mt-4 flex flex-wrap gap-3 text-[13px] text-slate-500">
              {duration && (
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={14} className="text-slate-400" />
                  {duration}
                </span>
              )}
              <span className="inline-flex items-baseline gap-1">
                <span className="font-heading text-[16px] font-bold text-slate-900">{price}</span>
                <span className="text-[11px] text-slate-400">AUD</span>
              </span>
            </div>

            {curriculum && curriculum.length > 0 && (
              <section className="mt-5">
                <h4 className="flex items-center gap-1.5 text-[13px] font-semibold text-slate-900">
                  <BookOpen size={14} className="text-sky-600" />
                  What you&apos;ll learn
                </h4>
                <ul className="mt-2 space-y-1.5">
                  {curriculum.map((item, i) => (
                    <li key={i} className="flex gap-2.5 text-[13px] text-slate-600">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-50 text-[10px] font-bold text-sky-700">
                        {i + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {includes && includes.length > 0 && (
              <section className="mt-5">
                <h4 className="flex items-center gap-1.5 text-[13px] font-semibold text-slate-900">
                  <Star size={14} className="text-sky-600" />
                  Everything included
                </h4>
                <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                  {includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-[13px] text-slate-600">
                      <Check size={13} className="mt-0.5 shrink-0 text-emerald-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {nextCourse && (
              <section className="mt-5 rounded-xl border border-sky-200 bg-sky-50 p-4">
                <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-sky-700">
                  <Target size={12} />
                  Next step
                </p>
                <p className="mt-1 text-[14px] font-semibold text-slate-900">{nextCourse.name}</p>
                <p className="text-[13px] text-slate-600">{nextCourse.reason}</p>
              </section>
            )}

            <div className="mt-6">
              <Button
                size="lg"
                className="w-full h-11 rounded-lg bg-sky-700 text-[14px] font-semibold text-white hover:bg-sky-600 shadow-sm"
                onClick={() => {
                  onClick();
                  setOpen(false);
                }}
              >
                {selected ? (
                  <>
                    <Check size={16} />
                    Selected
                  </>
                ) : (
                  'Select this service'
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
