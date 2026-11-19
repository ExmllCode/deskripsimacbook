/*---------------------------------------------------------------------
    File Name: macbook.js
    Interactive features for MacBook Laptop Portal
---------------------------------------------------------------------*/

$(document).ready(function () {
    "use strict";

    // 1. Smooth Scroll with Header Offset
    $('a[href^="#"]').on('click', function (e) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            e.preventDefault();
            var headerHeight = $('.header').outerHeight() || 80;
            $('html, body').stop().animate({
                scrollTop: target.offset().top - headerHeight + 10
            }, 800);

            // Close mobile navbar if open
            if ($('#navbarsExample04').hasClass('show')) {
                $('#navbarsExample04').collapse('hide');
            }
        }
    });

    // 2. Product Category Filter
    $('.product-filter-btn').on('click', function () {
        var category = $(this).attr('data-filter');
        $('.product-filter-btn').removeClass('active');
        $(this).addClass('active');

        if (category === 'all') {
            $('.product-item-col').fadeIn(350);
        } else {
            $('.product-item-col').hide();
            $('.product-item-col[data-category="' + category + '"]').fadeIn(350);
        }
    });

    // 3. Dynamic Quick Specs Modal Data
    var specsDatabase = {
        'air13': {
            title: 'MacBook Air 13-inch (M3 Chip)',
            price: 'Starting from $1,099',
            image: 'images/macbook_air_13.jpg',
            chips: 'Apple M3 chip (8-core CPU, up to 10-core GPU, 16-core Neural Engine)',
            display: '13.6-inch Liquid Retina display with True Tone, 500 nits, P3 wide color',
            memory: '8GB, 16GB, or 24GB Unified Memory (100GB/s bandwidth)',
            storage: '256GB, 512GB, 1TB, or 2TB superfast SSD',
            battery: 'Up to 18 hours Apple TV app movie playback / 15 hours wireless web',
            ports: 'MagSafe 3, two Thunderbolt / USB 4 ports, 3.5mm headphone jack with high-impedance support',
            weight: '1.24 kg (2.7 pounds) | 1.13 cm thickness (Fanless, completely silent)',
            audio: 'Four-speaker sound system, Spatial Audio with Dolby Atmos, 3-mic array'
        },
        'air15': {
            title: 'MacBook Air 15-inch (M3 Chip)',
            price: 'Starting from $1,299',
            image: 'images/macbook_air_15.jpg',
            chips: 'Apple M3 chip (8-core CPU, 10-core GPU, 16-core Neural Engine)',
            display: '15.3-inch Liquid Retina display with True Tone, 500 nits brightness',
            memory: '16GB or 24GB Unified Memory (100GB/s bandwidth)',
            storage: '512GB, 1TB, or 2TB SSD',
            battery: 'Up to 18 hours battery life, 66.5-watt-hour lithium-polymer battery',
            ports: 'MagSafe 3, two Thunderbolt / USB 4 ports, dual external display support (lid closed)',
            weight: '1.51 kg (3.3 pounds) | 1.15 cm thickness (Fanless silent operation)',
            audio: 'Six-speaker sound system with force-cancelling woofers, wide stereo sound'
        },
        'pro14': {
            title: 'MacBook Pro 14-inch (M4 / M4 Pro)',
            price: 'Starting from $1,599',
            image: 'images/macbook_pro_14.jpg',
            chips: 'Apple M4 (10-core) or M4 Pro (up to 14-core CPU, up to 20-core GPU)',
            display: '14.2-inch Liquid Retina XDR, 1,000,000:1 contrast, 1600 nits peak HDR, 120Hz ProMotion',
            memory: '16GB, 24GB, 36GB, or 48GB Unified Memory (up to 273GB/s bandwidth)',
            storage: '512GB, 1TB, 2TB, or 4TB SSD (up to 7.4GB/s read speeds)',
            battery: 'Up to 24 hours battery life - the longest ever in a Mac',
            ports: '3x Thunderbolt 4/5, HDMI 2.1 (8K 60Hz / 4K 240Hz), SDXC card slot, MagSafe 3',
            weight: '1.55 kg (3.4 pounds) | Advanced thermal system for continuous peak performance',
            audio: 'High-fidelity six-speaker sound system with force-cancelling woofers, studio-grade 3-mic array'
        },
        'pro16': {
            title: 'MacBook Pro 16-inch (M4 Pro / M4 Max)',
            price: 'Starting from $2,499',
            image: 'images/macbook_pro_16.jpg',
            chips: 'Apple M4 Pro (up to 14-core) or M4 Max (up to 16-core CPU, up to 40-core GPU)',
            display: '16.2-inch Liquid Retina XDR, mini-LED, 1600 nits peak brightness, 120Hz ProMotion',
            memory: '24GB, 36GB, 48GB, 64GB, or 128GB Unified Memory (up to 546GB/s bandwidth)',
            storage: '1TB, 2TB, 4TB, or 8TB ultrafast SSD',
            battery: 'Up to 24 hours battery life, 100-watt-hour battery, 140W USB-C fast charging',
            ports: '3x Thunderbolt 5 (up to 120Gb/s), HDMI 2.1, SDXC slot, MagSafe 3',
            weight: '2.14 kg (4.7 pounds) | Uncompromised multi-stream 8K video & 3D rendering',
            audio: 'Studio-grade six-speaker sound system with force-cancelling woofers'
        },
        'silicon': {
            title: 'Apple Silicon Architecture (M3 / M4)',
            price: 'Proprietary Apple SOC',
            image: 'images/apple_silicon_chip.jpg',
            chips: 'Second-generation 3-nanometer process technology with over 25+ billion transistors',
            display: 'Advanced Display Engine driving multiple high-resolution 6K and 8K Pro Display XDRs',
            memory: 'Unified Memory Architecture (UMA) eliminating CPU-GPU memory copy latency',
            storage: 'Integrated dedicated SSD controller with hardware AES crypto engine',
            battery: 'Unmatched performance-per-watt: uses only 1/4th the power of competitor PC chips',
            ports: 'Hardware ray-tracing, mesh shading, and AV1 video decode engine',
            weight: 'Industry-first 16-core Neural Engine delivering over 38 trillion operations per second',
            audio: 'Integrated low-latency audio processing unit'
        },
        'display': {
            title: 'Liquid Retina XDR Display Technology',
            price: 'Included on MacBook Pro',
            image: 'images/liquid_retina.jpg',
            chips: 'Custom timing controller (TCON) driving 10,000+ precision mini-LED backlight zones',
            display: '3456 x 2234 native resolution at 254 pixels per inch, 1,000,000:1 contrast ratio',
            memory: 'Color calibration for photography, SDR, HDR, and video production master profiles',
            storage: 'Nanotexture glass option available to dramatically reduce reflections and glare',
            battery: 'ProMotion adaptive refresh rates from 24Hz to 120Hz for fluid scrolling and battery saving',
            ports: 'True Tone technology automatically adjusts color temperature to ambient lighting',
            weight: '1,000 nits sustained full-screen brightness, 1,600 nits peak HDR brightness',
            audio: 'Wide color support (P3) with 1 billion colors'
        },
        'keyboard': {
            title: 'Magic Keyboard with Touch ID & Force Touch',
            price: 'Standard on all MacBooks',
            image: 'images/magic_keyboard.jpg',
            chips: 'Secure Enclave coprocessor for encrypted fingerprint authentication and Apple Pay',
            display: 'Ambient light sensor with automatic backlighting adjustments',
            memory: 'Full-height function key row with physical Escape key and spotlight/dictation keys',
            storage: 'Refined scissor mechanism with 1mm key travel for quiet and tactile typing',
            battery: 'Force Touch trackpad with pressure-sensitive drawing, Force click, and Multi-Touch gestures',
            ports: 'Taptic Engine provides precise haptic feedback anywhere on the trackpad surface',
            weight: 'Spill-resistant anodized aluminium keyboard well',
            audio: 'Quiet typing acoustics engineered for library and boardroom environments'
        },
        'magsafe': {
            title: 'MagSafe 3 & High-Speed Connectivity Suite',
            price: 'Included Hardware Interface',
            image: 'images/macbook_accessories.jpg',
            chips: 'Thunderbolt 4 / 5 controllers delivering up to 120 Gb/s bidirectional throughput',
            display: 'Support for up to four external displays on M4 Max models (three 6K + one 4K)',
            memory: 'MagSafe 3 magnetic breakaway charging cable prevents laptop drops',
            storage: 'Fast-charging capable: 50% battery charge in just 30 minutes with 96W/140W adapter',
            battery: 'Supports universal charging via any USB-C port in addition to MagSafe',
            ports: 'Full-size SDXC card reader with UHS-II transfer speeds up to 312 MB/s',
            weight: 'HDMI 2.1 port supporting multichannel audio output and variable refresh rate (VRR)',
            audio: '3.5mm headphone jack with automatic impedance detection for audiophile headphones'
        },
        'colors': {
            title: 'MacBook Aerospace-Grade Finishes & Colors',
            price: 'Color Options',
            image: 'images/macbook_colors.jpg',
            chips: '100% recycled aluminum unibody enclosure precision CNC machined',
            display: 'Breakthrough anodization chemistry that drastically reduces visible fingerprints',
            memory: 'Available finishes: Space Black, Silver, Space Gray, Starlight, and Midnight',
            storage: 'Environmentally conscious: 100% recycled rare earth elements in all magnets',
            battery: 'Certified EPEAT Gold and Energy Star compliant',
            ports: 'Color-matched braided MagSafe charging cables included in every box',
            weight: 'Durable scratch-resistant bead-blasted surface finish',
            audio: 'Designed for durability with zero carbon footprint manufacturing targets'
        }
    };

    // Open Modal and populate
    $('.btn-specs').on('click', function (e) {
        e.preventDefault();
        var modelKey = $(this).attr('data-model');
        var data = specsDatabase[modelKey];
        if (data) {
            $('#specModalLabel').text(data.title);
            $('#modalPrice').text(data.price);
            $('#modalImg').attr('src', data.image);
            $('#modalChip').text(data.chips);
            $('#modalDisplay').text(data.display);
            $('#modalMemory').text(data.memory);
            $('#modalStorage').text(data.storage);
            $('#modalBattery').text(data.battery);
            $('#modalPorts').text(data.ports);
            $('#modalWeight').text(data.weight);
            $('#modalAudio').text(data.audio);
            $('#specModal').modal('show');
        }
    });

    // 4. Contact Form Handling
    $('#macbookRequestForm').on('submit', function (e) {
        e.preventDefault();
        var name = $(this).find('input[name="Name"]').val();
        var email = $(this).find('input[name="Email"]').val();
        var phone = $(this).find('input[name="Phone"]').val();
        var model = $(this).find('select[name="Model"]').val();
        var message = $(this).find('textarea[name="Message"]').val();

        if (!name || !email) {
            alert('Please provide your name and email address.');
            return;
        }

        // Display Success Alert
        $('#formAlertSuccess').slideDown(400);
        $('#macbookRequestForm')[0].reset();

        setTimeout(function () {
            $('#formAlertSuccess').slideUp(500);
        }, 8000);
    });

    // 5. Active Navbar Link on Scroll
    $(window).on('scroll', function () {
        var scrollPos = $(document).scrollTop() + 120;
        $('.navbar-nav .nav-item a[href^="#"]').each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr('href'));
            if (refElement.length) {
                if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                    $('.navbar-nav .nav-item').removeClass('active');
                    currLink.parent().addClass('active');
                }
            }
        });
    });
});
