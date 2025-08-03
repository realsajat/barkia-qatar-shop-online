import React from 'react';

const logos = [
  { src: '/logos/logo1.png', alt: 'Ezdan Mall' },
  { src: '/logos/logo2.png', alt: 'Enormous' },
  { src: '/logos/logo3.png', alt: 'Festival City' },
  { src: '/logos/logo4.png', alt: 'Al Khalij' },
  { src: '/logos/logo5.png', alt: 'Al Arabia' },
  { src: '/logos/logo6.png', alt: 'AL MUFTAH GROUP' },
  { src: '/logos/logo7.png', alt: 'Al Anaka event planning' },
  { src: '/logos/logo8.png', alt: 'ALSAM Trading & contacting service L.L.C' },
  { src: '/logos/logo9.png', alt: 'GRADE ONE Trading & Contracting' },
  { src: '/logos/logo10.png', alt: 'Inworth' },
  { src: '/logos/logo11.png', alt: 'Petro guard offshore  Shapelier' },
  { src: '/logos/logo12.png', alt: 'Asia trading Engineering & Services' },
];

const TrustedBy: React.FC = () => {
  // Duplicate logos for a seamless scroll effect
  const extendedLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto text-center">
        <h2 className="font-playfair text-4xl font-bold mb-4">Trusted By</h2>
        <p className="font-poppins text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          We are proud to partner with leading companies and organizations in Qatar.
        </p>
        <div
          className="relative w-full overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          }}
        >
          <div className="flex w-max animate-scroll">
            {extendedLogos.map((logo, index) => {
              const isLarger = logo.src === '/logos/logo2.png' || logo.src === '/logos/logo3.png';
              const logoClass = `w-auto object-contain transition-all duration-300 ${isLarger ? 'max-h-24 sm:max-h-36' : 'max-h-20 sm:max-h-28'}`;

              return (
                <div key={index} className="flex-shrink-0 w-48 h-28 sm:w-64 sm:h-40 flex items-center justify-center mx-0.5 sm:mx-2">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className={logoClass}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
