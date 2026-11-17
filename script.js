 tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            khmer: ['"Kantumruy Pro"', 'sans-serif'],
            sans: ['"Plus Jakarta Sans"', '"Kantumruy Pro"', 'sans-serif'],
          },
          colors: {
            kubota: {
              orange: '#EA580C',
              dark: '#C2410C',
              light: '#FFF7ED',
            },
            paddy: {
              green: '#15803D',
              dark: '#14532D',
              light: '#F0FDF4',
            }
          }
        }
      }
    }
    const currentLang = 'km';
    const RATES_PER_HECTARE = {
      harvest: 400000, // 400,000 KHR per hectare
      tractor: 250000  // 250,000 KHR per hectare
    };

    const UNIT_TO_HECTARE = {
      hectare: 1,
      rai: 0.16,
      are: 0.01
    };
//image slider in script.js 
    const featuredMachines = [
      {
        image: 'images/kubota-dc70-pro.png',
        title: 'Kubota DC-70 Pro',
        alt: {
          km: 'ម៉ាស៊ីនច្រូតស្រូវ Kubota DC-70 Pro',
          en: 'Kubota DC-70 Pro rice combine harvester'
        },
        captionKey: 'heroImgCaption'
      },
      {
        image: 'images/tractor1.jpg',
        title: 'Kubota M6040',
        alt: {
          km: 'ត្រាក់ទ័រ Kubota M6040',
          en: 'Kubota M6040 tractor'
        },
        captionKey: 'heroTractorCaption'
      }
    ];
    let activeFeaturedMachine = 0;

    const translations = {
      km: {
        brandName: "បងស្រនម៉ាស៉ុនច្រូត",
        locationShort: "📍 ភូមិព្រៃភ្លង ឃំុសំបួរ ស្រុកទ្រាំង ខេត្តតាកែវ",
        heroBadge: "🌾 សេវាកម្មកសិកម្មប្រចាំខេត្តតាកែវ",
        heroTitle: "សេវាកម្មច្រូតកាត់ស្រូវ និងវាយដីត្រាក់ទ័រ រហ័ស ស្អាត តម្លៃសមរម្យ",
        heroSubtitle: "បម្រើសេវាកម្មជូនបងប្អូនកសិករដោយគ្រឿងចក្រ Kubota ទំនើបៗ ច្រូតស្អាតមិនជ្រុះស្រូវ វាយដីម៉ដ្ឋល្អ ទាន់ពេលវេលា នៅភូមិព្រៃភ្លង ស្រុកទ្រាំង និងតំបន់ជុំវិញខេត្តតាកែវ។",
        callNowBtn: "តេកក់ឥឡូវនេះ 097 547 1944",
        calcPriceBtn: "គណនាតម្លៃតាមទំហំដី",
        heroImgCaption: "ម៉ាស៊ីនច្រូតស្រូវកម្លាំងខ្លាំង ច្រូតលឿន និងស្អាត",
        heroTractorCaption: "ត្រាក់ទ័រកម្លាំងខ្លាំង សម្រាប់ភ្ជួរ វាយដី និងឈូសពង្រាបដី",
        readyBadge: "រួចរាល់បម្រើសេវា",
        servicesHeading: "សេវាកម្មចម្បងរបស់យើង",
        servicesSubheading: "ចុចជ្រើសរើសសេវាកម្មខាងក្រោម ដើម្បីគណនាតម្លៃ និងកក់ទុកជាមុន",
        harvestTitle: "សេវាកម្មច្រូតកាត់ស្រូវ",
        harvestDesc: "ច្រូតស្រូវគ្រប់ប្រភេទ (ស្រូវស្រាល ស្រូវកណ្តាល ស្រូវធ្ងន់ និងស្រូវដួល) ដោយម៉ាស៊ីន Kubota DC-70 Pro ជំនាន់ថ្មី បោកបែនស្អាត មិនបែកគ្រាប់ និងបាញ់ចូលបាវរហ័សទាន់ចិត្ត។",
        harvestFeat1: "ច្រូតស្អាត កាត់បន្ថយការជ្រុះបាត់បង់គ្រាប់ស្រូវ",
        harvestFeat2: "ចុះស្រែភក់ ឬស្រូវដួលបានល្អ",
        harvestFeat3: "តម្លៃប៉ាន់ស្មាន៖ ៤០០,០០០ ៛ / ហិកតា (អាចចរចាតាមស្ថានភាពស្រែ)",
        bookHarvestBtn: "ជ្រើសរើសសេវាច្រូតកាត់ស្រូវ ➔",
        tractorTitle: "សេវាកម្មវាយដី និងឈូសដីត្រាក់ទ័រ",
        tractorDesc: "ភ្ជួររាស់ វាយដីស្រែ វាយដីចម្ការ និងឈូសពង្រាបដីដោយត្រាក់ទ័រ Kubota M6040 កម្លាំងខ្លាំង ធ្វើឱ្យដីម៉ដ្ឋ ធូរ ងាយស្រួលព្រោះ ឬស្ទូង និងបង្កើនទិន្នផលដំណាំ។",
        tractorFeat1: "វាយដីសើម ដីគោក និងភ្ជួរបង្កប់ជញ្ជ្រាំងបានល្អ",
        tractorFeat2: "មានប៉ែលមុខសម្រាប់ឈូសពង្រាបភ្លឺ ឬដីឡូត៍",
        tractorFeat3: "តម្លៃប៉ាន់ស្មាន៖ ២៥០,០០០ ៛ / ហិកតា (អាចចរចាតាមប្រភេទដី)",
        bookTractorBtn: "ជ្រើសរើសសេវាវាយដីត្រាក់ទ័រ ➔",
        calcTag: "គណនាតម្លៃ និងកក់ជួល",
        calcHeading: "ប៉ាន់ស្មានតម្លៃតាមទំហំដីរបស់អ្នក",
        labelService: "១. ជ្រើសរើសប្រភេទសេវាកម្ម",
        optHarvest: "🌾 ច្រូតកាត់ស្រូវ (DC-70 Pro)",
        optTractor: "🚜 វាយដីត្រាក់ទ័រ (M6040)",
        labelSize: "២. បញ្ចូលទំហំដី",
        labelUnit: "៣. ខ្នាតរង្វាស់ដី",
        unitHectare: "ហិកតា (Hectare - ១០០ អា)",
        unitRai: "រ៉ៃ (Rai - ១៦ អា)",
        unitAre: "អា (Are - ១០០ ម៉ែត្រការ៉េ)",
        labelName: "៤. ឈ្មោះរបស់អ្នក",
        labelPhone: "៥. លេខទូរស័ព្ទទំនាក់ទំនង",
        labelDate: "៦. កាលបរិច្ឆេទដែលចង់កក់",
        labelVillage: "៧. ទីតាំងដីស្រែ (ភូមិ / ឃុំ)",
        labelPhoto: "រូបថតស្រែ (មិនចាំបាច់)",
        photoHelp: "អាចបញ្ចូលរូបភាព JPG, PNG ឬ WebP (ទំហំមិនលើស ៨ MB)",
        estTotalLabel: "តម្លៃប៉ាន់ស្មានសរុប៖",
        confirmBookingBtn: "បញ្ជាក់ការកក់សេវា ✓",
        aboutTag: "អំពីអាជីវកម្មរបស់យើង",
        aboutTitle: "បងស្រនម៉ាស៉ុនច្រូត — ទំនុកចិត្តរបស់កសិករនៅស្រុកទ្រាំង",
        aboutDesc: "យើងខ្ញុំមានបទពិសោធន៍យូរឆ្នាំក្នុងការផ្តល់សេវាកម្មច្រូតកាត់ស្រូវ និងវាយដីជូនបងប្អូនកសិករ។ គ្រឿងចក្រទាំងអស់ត្រូវបានថែទាំយ៉ាងយកចិត្តទុកដាក់ ដើម្បីធានាថាការងាររបស់បងប្អូនរួចរាល់ទាន់រដូវកាល មិនខកខានពេលវេលា។",
        fullAddress: "ទីតាំង៖ ភូមិព្រៃភ្លង ស្រុកទ្រាំង ខេត្តតាកែវ",
        phoneDisplay: "លេខទូរស័ព្ទ៖",
        callOwnerBtn: "តេជួបបងស្រនផ្ទាល់",
        mobileBookBtn: "កក់សេវា",
        modalTitle: "បានរៀបចំព័ត៌មានកក់រួចរាល់!",
        modalCallBtn: "តេបញ្ជាក់ទៅកាន់ 097 547 1944",
        modalSmsBtn: "ផ្ញើសារ SMS ព័ត៌មានកក់",
        modalCloseBtn: "បិទផ្ទាំងនេះ"
      },
      en: {
        brandName: "Bong Sron Harvesting Service",
        locationShort: "📍 Prey Phlong Village, Treang, Takeo",
        heroBadge: "🌾 Trusted Agricultural Service in Takeo",
        heroTitle: "Fast & Clean Rice Harvesting and Tractor Tilling Services",
        heroSubtitle: "Serving local farmers with modern Kubota machinery. Minimal grain loss, fine soil tilling, and punctual service in Prey Phlong Village, Treang District, Takeo Province.",
        callNowBtn: "Call to Book: 097 547 1944",
        calcPriceBtn: "Estimate Price by Land Size",
        heroImgCaption: "High-power combine harvester for fast, clean results",
        heroTractorCaption: "Powerful tractor for plowing, tilling, and land leveling",
        readyBadge: "Available Now",
        servicesHeading: "Our Core Machinery Services",
        servicesSubheading: "Select a service below to calculate your estimate and book ahead",
        harvestTitle: "Rice Combine Harvesting",
        harvestDesc: "Harvesting all rice varieties (including lodged paddy) using our modern Kubota DC-70 Pro combine harvester. Clean threshing with minimal grain loss and fast bagging.",
        harvestFeat1: "Clean cut with minimal grain loss",
        harvestFeat2: "Handles muddy fields and lodged rice smoothly",
        harvestFeat3: "Est. Rate: 400,000 KHR / Hectare (negotiable by field condition)",
        bookHarvestBtn: "Select Rice Harvesting ➔",
        tractorTitle: "Tractor Plowing & Land Leveling",
        tractorDesc: "Heavy-duty plowing, rotary tilling, and front-blade leveling with our Kubota M6040 tractor for soft, even soil ready for seeding or transplanting.",
        tractorFeat1: "Works on wet paddy fields, dry land, and stubble",
        tractorFeat2: "Equipped with front dozer blade for bunds & leveling",
        tractorFeat3: "Est. Rate: 250,000 KHR / Hectare (negotiable by soil type)",
        bookTractorBtn: "Select Tractor Tilling ➔",
        calcTag: "Price Estimator & Booking",
        calcHeading: "Estimate Cost by Your Land Area",
        labelService: "1. Choose Service Type",
        optHarvest: "🌾 Rice Harvesting (DC-70 Pro)",
        optTractor: "🚜 Tractor Tilling (M6040)",
        labelSize: "2. Enter Land Size",
        labelUnit: "3. Land Measurement Unit",
        unitHectare: "Hectare (100 Are)",
        unitRai: "Rai (16 Are)",
        unitAre: "Are (100 sqm)",
        labelName: "4. Your Name",
        labelPhone: "5. Your Phone Number",
        labelDate: "6. Preferred Booking Date",
        labelVillage: "7. Field Location (Village / Commune)",
        labelPhoto: "Field photo (optional)",
        photoHelp: "Add a JPG, PNG, or WebP image (up to 8 MB)",
        estTotalLabel: "Estimated Total Cost:",
        confirmBookingBtn: "Confirm Booking Request ✓",
        aboutTag: "About Our Business",
        aboutTitle: "Bong Sron Harvesting — Trusted by Farmers in Treang",
        aboutDesc: "With years of hands-on experience serving farmers across Takeo, our Kubota machinery is well-maintained to ensure your harvest and land preparation finish right on schedule.",
        fullAddress: "Location: Prey Phlong Village, Treang District, Takeo",
        phoneDisplay: "Phone:",
        callOwnerBtn: "Call Bong Sron Directly",
        mobileBookBtn: "Book Now",
        modalTitle: "Booking Summary Ready!",
        modalCallBtn: "Call 097 547 1944 to Confirm",
        modalSmsBtn: "Send Booking via SMS",
        modalCloseBtn: "Close Window"
      }
    };

    function toggleTheme() {
      const body = document.body;
      const isDark = body.classList.toggle('dark-mode');
      const icon = document.getElementById('themeIcon');
      if (icon) {
        icon.textContent = isDark ? '☀️' : '🌙';
      }
      localStorage.setItem('themeMode', isDark ? 'dark' : 'light');
    }

    function initTheme() {
      const savedTheme = localStorage.getItem('themeMode');
      const isDark = savedTheme === 'dark';
      document.body.classList.toggle('dark-mode', isDark);
      const icon = document.getElementById('themeIcon');
      if (icon) {
        icon.textContent = isDark ? '☀️' : '🌙';
      }
    }

    function showFeaturedMachine(index) {
      activeFeaturedMachine = (index + featuredMachines.length) % featuredMachines.length;
      const machine = featuredMachines[activeFeaturedMachine];
      const image = document.getElementById('heroMachineImage');
      const title = document.getElementById('heroMachineTitle');
      const caption = document.getElementById('heroMachineCaption');

      if (!image || !title || !caption) return;

      image.src = machine.image;
      image.alt = machine.alt[currentLang];
      title.textContent = machine.title;
      caption.textContent = translations[currentLang][machine.captionKey];

      document.querySelectorAll('[data-machine-slide]').forEach((indicator, indicatorIndex) => {
        const isActive = indicatorIndex === activeFeaturedMachine;
        indicator.classList.toggle('is-active', isActive);
        indicator.setAttribute('aria-pressed', String(isActive));
      });
    }

    function selectService(type) {
      const radio = document.querySelector(`input[name="serviceType"][value="${type}"]`);
      if (radio) {
        radio.checked = true;
        calculateTotal();
      }
      document.getElementById('calculator').scrollIntoView({ behavior: 'smooth' });
    }

    function calculateTotal() {
      const service = document.querySelector('input[name="serviceType"]:checked').value;
      const size = parseFloat(document.getElementById('landSize').value) || 0;
      const unit = document.getElementById('landUnit').value;

      const hectares = size * UNIT_TO_HECTARE[unit];
      const totalKhr = Math.round(hectares * RATES_PER_HECTARE[service]);
      const totalUsd = Math.round(totalKhr / 4000);

      document.getElementById('totalKhr').textContent = totalKhr.toLocaleString('en-US') + ' ៛';
      document.getElementById('totalUsd').textContent = currentLang === 'km'
        ? `≈ $${totalUsd} USD (គិតតាមអត្រា ៤,០០០ ៛)`
        : `≈ $${totalUsd} USD (at 4,000 KHR/USD)`;
    }

    async function submitBooking(e) {
      e.preventDefault();
      const photoInput = document.getElementById('fieldPhoto');
      const fieldPhoto = photoInput.files[0];
      if (fieldPhoto && fieldPhoto.size > 8 * 1024 * 1024) {
        alert(currentLang === 'km'
          ? 'រូបភាពត្រូវមានទំហំមិនលើស ៨ MB។'
          : 'The image must be 8 MB or smaller.');
        return;
      }

      const submitButton = e.submitter;
      if (submitButton) submitButton.disabled = true;

      const service = document.querySelector('input[name="serviceType"]:checked').value;
      const size = document.getElementById('landSize').value;
      const unitSelect = document.getElementById('landUnit');
      const unitText = unitSelect.options[unitSelect.selectedIndex].text;
      const name = document.getElementById('customerName').value.trim();
      const phone = document.getElementById('customerPhone').value.trim();
      const bookingDate = document.getElementById('bookingDate').value;
      const location = document.getElementById('villageLocation').value.trim();
      const total = document.getElementById('totalKhr').textContent;

      const serviceLabel = service === 'harvest'
        ? (currentLang === 'km' ? 'ច្រូតកាត់ស្រូវ (Kubota DC-70 Pro)' : 'Rice Harvesting (Kubota DC-70 Pro)')
        : (currentLang === 'km' ? 'វាយដីត្រាក់ទ័រ (Kubota M6040)' : 'Tractor Tilling (Kubota M6040)');

      const refCode = '#BS-' + Math.floor(1000 + Math.random() * 9000);
      document.getElementById('bookingRef').textContent = (currentLang === 'km' ? 'លេខកូដកក់៖ ' : 'Booking ID: ') + refCode;

      const summary = document.getElementById('modalSummary');
      summary.replaceChildren();
      const summaryRows = [
        [currentLang === 'km' ? 'សេវាកម្ម៖' : 'Service:', serviceLabel],
        [currentLang === 'km' ? 'ទំហំដី៖' : 'Land Area:', `${size} (${unitText})`],
        [currentLang === 'km' ? 'តម្លៃប៉ាន់ស្មាន៖' : 'Est. Total:', total],
        [currentLang === 'km' ? 'អតិថិជន៖' : 'Customer:', `${name} (${phone})`],
        [currentLang === 'km' ? 'កាលបរិច្ឆេទចង់កក់៖' : 'Preferred Date:', bookingDate],
        [currentLang === 'km' ? 'ទីតាំងដី៖' : 'Location:', location]
      ];
      summaryRows.forEach(([label, value]) => {
        const row = document.createElement('p');
        const heading = document.createElement('strong');
        heading.textContent = label;
        row.append(heading, ` ${value}`);
        summary.appendChild(row);
      });

      const smsBody = encodeURIComponent(
        `សួស្តីបងស្រន! ខ្ញុំសុំកក់${serviceLabel}
- ទំហំដី: ${size} ${unitSelect.value}
- តម្លៃប៉ាន់ស្មាន: ${total}
- ឈ្មោះ: ${name} (${phone})
- កាលបរិច្ឆេទចង់កក់: ${bookingDate}
- ទីតាំង: ${location}`
      );
      document.getElementById('smsLink').href = `sms:0975471944?body=${smsBody}`;

      const bookingData = new FormData();
      bookingData.set('bookingId', refCode);
      bookingData.set('service', service);
      bookingData.set('size', size);
      bookingData.set('unit', unitSelect.value);
      bookingData.set('name', name);
      bookingData.set('phone', phone);
      bookingData.set('bookingDate', bookingDate);
      bookingData.set('location', location);
      if (fieldPhoto) bookingData.set('fieldPhoto', fieldPhoto);

      try {
        const response = await fetch('telegram-booking.php', {
          method: 'POST',
          body: bookingData
        });
        const result = await response.json();
        if (!response.ok || !result.success) {
          throw new Error('Booking notification failed');
        }
        document.getElementById('confirmModal').classList.remove('hidden');
      } catch (error) {
        alert(currentLang === 'km'
          ? 'មិនអាចផ្ញើការកក់បានទេ។ សូមព្យាយាមម្តងទៀត ឬទាក់ទងតាមទូរស័ព្ទ។'
          : 'Could not send your booking. Please try again or contact us by phone.');
      } finally {
        if (submitButton) submitButton.disabled = false;
      }
    }

    function closeModal() {
      document.getElementById('confirmModal').classList.add('hidden');
    }

    function openContactPopup() {
      const popup = document.getElementById('contactPopup');
      if (popup) {
        popup.classList.remove('hidden');
        popup.classList.add('flex');
      }
    }

    function closeContactPopup() {
      const popup = document.getElementById('contactPopup');
      if (popup) {
        popup.classList.add('hidden');
        popup.classList.remove('flex');
      }
    }

    document.addEventListener('DOMContentLoaded', () => {
      const toggles = document.querySelectorAll('.contact-menu-toggle');
      const closeBtn = document.getElementById('closeContactPopup');
      const popup = document.getElementById('contactPopup');
      const backToTop = document.getElementById('backToTop');
      const photoInput = document.getElementById('fieldPhoto');
      const photoPreview = document.getElementById('fieldPhotoPreview');
      const bookingDateInput = document.getElementById('bookingDate');
      const machineCarousel = document.getElementById('featuredMachineCarousel');

      toggles.forEach((toggle) => toggle.addEventListener('click', openContactPopup));

      if (machineCarousel) {
        const previousButton = document.getElementById('heroMachinePrevious');
        const nextButton = document.getElementById('heroMachineNext');
        const indicators = machineCarousel.querySelectorAll('[data-machine-slide]');
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let carouselTimer;

        const stopCarousel = () => {
          window.clearInterval(carouselTimer);
          carouselTimer = null;
        };
        const startCarousel = () => {
          if (reduceMotion || document.hidden || carouselTimer) return;
          carouselTimer = window.setInterval(() => {
            showFeaturedMachine(activeFeaturedMachine + 1);
          }, 3000);
        };

        previousButton.addEventListener('click', () => showFeaturedMachine(activeFeaturedMachine - 1));
        nextButton.addEventListener('click', () => showFeaturedMachine(activeFeaturedMachine + 1));
        indicators.forEach((indicator) => {
          indicator.addEventListener('click', () => {
            showFeaturedMachine(Number(indicator.dataset.machineSlide));
          });
        });

        machineCarousel.addEventListener('mouseenter', stopCarousel);
        machineCarousel.addEventListener('mouseleave', startCarousel);
        machineCarousel.addEventListener('focusin', stopCarousel);
        machineCarousel.addEventListener('focusout', (event) => {
          if (!machineCarousel.contains(event.relatedTarget)) startCarousel();
        });
        document.addEventListener('visibilitychange', () => {
          if (document.hidden) stopCarousel();
          else startCarousel();
        });
        startCarousel();
      }

      if (bookingDateInput) {
        const today = new Date();
        const minDate = [
          today.getFullYear(),
          String(today.getMonth() + 1).padStart(2, '0'),
          String(today.getDate()).padStart(2, '0')
        ].join('-');
        bookingDateInput.min = minDate;
      }

      if (photoInput && photoPreview) {
        let previewUrl = null;
        photoInput.addEventListener('change', () => {
          if (previewUrl) URL.revokeObjectURL(previewUrl);
          const photo = photoInput.files[0];
          if (!photo) {
            photoPreview.removeAttribute('src');
            photoPreview.classList.add('hidden');
            return;
          }
          if (photo.size > 8 * 1024 * 1024) {
            photoInput.value = '';
            photoPreview.removeAttribute('src');
            photoPreview.classList.add('hidden');
            alert(currentLang === 'km'
              ? 'រូបភាពត្រូវមានទំហំមិនលើស ៨ MB។'
              : 'The image must be 8 MB or smaller.');
            return;
          }
          previewUrl = URL.createObjectURL(photo);
          photoPreview.src = previewUrl;
          photoPreview.classList.remove('hidden');
        });
      }

      if (backToTop) {
        const updateBackToTopVisibility = () => {
          const isVisible = window.scrollY > 320;
          backToTop.classList.toggle('hidden', !isVisible);
          backToTop.classList.toggle('flex', isVisible);
        };

        window.addEventListener('scroll', updateBackToTopVisibility, { passive: true });
        backToTop.addEventListener('click', () => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        updateBackToTopVisibility();
      }

      if (closeBtn) {
        closeBtn.addEventListener('click', closeContactPopup);
      }

      if (popup) {
        popup.addEventListener('click', (event) => {
          if (event.target === popup) {
            closeContactPopup();
          }
        });
      }
    });

    // Initialize total on load
    initTheme();
    calculateTotal();
