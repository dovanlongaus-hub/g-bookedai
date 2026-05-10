'use client';

import { useEffect, useCallback } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import { motion } from "motion/react"
import { useState } from 'react';

const testimonials = [
  {
    quote:
      'The AI mentoring session completely changed how I approach automation in my business. Within a week, I saved 10 hours of manual work.',
    name: 'Sarah T.',
    role: 'Operations Manager',
    location: 'Sydney, AU',
    rating: 5,
  },
  {
    quote:
      'I went from knowing nothing about AI to building custom GPT workflows for my team. The personalised guidance made all the difference.',
    name: 'James L.',
    role: 'Small Business Owner',
    location: 'Melbourne, AU',
    rating: 5,
  },
  {
    quote:
      'The 5-session package was exactly what I needed. Each session built on the last, and the AI-generated notes helped me retain everything.',
    name: 'Minh N.',
    role: 'Marketing Director',
    location: 'Brisbane, AU',
    rating: 5,
  },
  {
    quote:
      'Professional, knowledgeable, and incredibly patient. Best investment I have made in my career development this year.',
    name: 'Priya K.',
    role: 'Product Designer',
    location: 'Perth, AU',
    rating: 5,
  },
];

export function TestimonialCarousel() {
  const [api, setApi] = useState<CarouselApi>();

  // Manual autoplay via useEffect
  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="py-24 bg-slate-50">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.h2
          className="mb-4 text-center text-3xl font-bold sm:text-4xl text-slate-900"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          What Our Clients Say
        </motion.h2>
        <motion.p
          className="mx-auto mb-16 max-w-md text-center text-slate-600"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Real results from real professionals.
        </motion.p>

        <motion.div
          className="mx-auto max-w-[700px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Carousel
            opts={{ loop: true, align: "center" }}
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((t, index) => (
                <CarouselItem key={index}>
                  <Card className="card-border-gradient overflow-hidden bg-white border-slate-200 shadow-sm ring-0">
                    {/* Gradient top border */}
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

                    <CardContent className="px-8 py-10 text-center sm:px-12 sm:py-14">
                      {/* Quote icon */}
                      <div className="mb-4 flex justify-center">
                        <Quote className="size-8 text-blue-100" />
                      </div>

                      {/* Stars */}
                      <div className="mb-6 flex justify-center gap-1">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>

                      {/* Quote text */}
                      <blockquote className="mb-8 text-lg leading-relaxed text-slate-700 italic sm:text-xl">
                        &ldquo;{t.quote}&rdquo;
                      </blockquote>

                      {/* Attribution */}
                      <div>
                        <div className="text-base font-semibold text-slate-900">
                          {t.name}
                        </div>
                        <div className="mt-1 text-sm text-slate-500">
                          {t.role} &middot; {t.location}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-slate-200 bg-white text-slate-600 hover:bg-slate-50 -left-4 sm:-left-12" />
            <CarouselNext className="border-slate-200 bg-white text-slate-600 hover:bg-slate-50 -right-4 sm:-right-12" />
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
}
