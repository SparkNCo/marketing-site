"use client";

import React from "react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

interface TrustMetric {
  value: string;
  label: string;
}

interface ClientLogo {
  src: string;
  alt: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "The team delivered a scalable MVP in record time. Their AI-powered approach made all the difference.",
    author: "Sarah Chen",
    role: "CTO",
    company: "TechStart Inc",
  },
  {
    quote: "From concept to production, they guided us every step of the way. Truly unbreakable software.",
    author: "Michael Rodriguez",
    role: "Founder",
    company: "GrowthLabs",
  },
  {
    quote: "Battle-tested systems that scaled from 100 to 10,000 users without a hitch.",
    author: "Emily Watson",
    role: "Product Lead",
    company: "ScaleUp Co",
  },
];

const trustMetrics: TrustMetric[] = [
  { value: "50+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "24/7", label: "Support Available" },
];

const clientLogos: ClientLogo[] = [
  { src: "/awsIcon.png", alt: "AWS Partner" },
  { src: "/gcpIcon.png", alt: "Google Cloud Partner" },
  { src: "/azureIcon.png", alt: "Azure Partner" },
  { src: "/sbaseIcon.png", alt: "Supabase Partner" },
];

const SocialProofSection: React.FC = () => {
  return (
    <section className="w-full bg-foreground py-12 md:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[850px] lg:max-w-[1530px] px-4 sm:px-4 md:px-8 lg:px-12">
        {/* Trust Metrics */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 mb-12 md:mb-16">
          {trustMetrics.map((metric, index) => (
            <div
              key={index}
              className="text-center p-4 md:p-6 bg-background rounded-lg"
            >
              <div className="text-largeBody md:text-heading1 font-bold text-primary mb-2">
                {metric.value}
              </div>
              <div className="text-smalltext md:text-body text-foreground">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Section Title */}
        <h2 className="text-largeBody md:text-heading1 font-bold text-center text-background mb-8 md:mb-12">
          Trusted by Industry Leaders
        </h2>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-background p-6 md:p-8 rounded-lg flex flex-col justify-between min-h-[280px] md:min-h-[320px]"
            >
              <div>
                <div className="text-primary text-4xl mb-4">&ldquo;</div>
                <p className="text-body text-foreground leading-relaxed mb-6">
                  {testimonial.quote}
                </p>
              </div>
              <div className="border-t border-foreground/20 pt-4">
                <p className="text-body font-bold text-foreground">
                  {testimonial.author}
                </p>
                <p className="text-smalltext text-foreground/70">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Client Logos */}
        <div className="border-t border-background/20 pt-8 md:pt-12">
          <p className="text-center text-body text-background/70 mb-6 md:mb-8">
            Powered by industry-leading technologies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
            {clientLogos.map((logo, index) => (
              <div
                key={index}
                className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
