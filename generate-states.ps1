$base = "c:\Users\PC\Claude\Clients\Pierson Digital"

$states = @(
  @{ name="Alabama"; slug="alabama"; cities="Birmingham, Montgomery, Huntsville, Mobile, and Tuscaloosa"
     intro="From Birmingham's industrial economy to the government offices of Montgomery and the fast-growing tech sector in Huntsville, Alabama businesses compete harder than ever for online visibility. Pierson Digital partners with Alabama companies to build digital presences that drive real customers, not just traffic." },
  @{ name="Alaska"; slug="alaska"; cities="Anchorage, Fairbanks, Juneau, Sitka, and Kenai"
     intro="Alaska's unique geography and economy create distinct marketing challenges. Whether you're serving Anchorage's dense urban market, the commercial activity around Fairbanks, or coastal communities like Juneau and Sitka, Pierson Digital builds digital strategies that work in Alaska's one-of-a-kind market." },
  @{ name="Arizona"; slug="arizona"; cities="Phoenix, Tucson, Mesa, Chandler, and Scottsdale"
     intro="Arizona is one of the fastest-growing states in the country. Phoenix, Scottsdale, Tucson, Mesa, and Chandler are packed with businesses competing for the same customers online. Pierson Digital helps Arizona businesses cut through the noise with SEO, paid ads, and digital systems built to win." },
  @{ name="Arkansas"; slug="arkansas"; cities="Little Rock, Fort Smith, Fayetteville, Springdale, and Rogers"
     intro="From the capital city of Little Rock to the thriving Northwest Arkansas corridor of Fayetteville, Springdale, and Rogers, Arkansas businesses are growing and so is the competition for online customers. Pierson Digital gives Arkansas companies the digital edge they need to stand out." },
  @{ name="California"; slug="california"; cities="Los Angeles, San Francisco, San Diego, San Jose, and Sacramento"
     intro="California is one of the most competitive digital markets in the world. Whether you're in Los Angeles, San Francisco, San Diego, San Jose, or Sacramento, your customers are searching for you online and so are your competitors. Pierson Digital helps California businesses rank higher, run better ads, and convert more leads." },
  @{ name="Colorado"; slug="colorado"; cities="Denver, Colorado Springs, Aurora, Fort Collins, and Boulder"
     intro="Colorado's booming economy - from Denver's business corridor to Fort Collins's innovation scene and Colorado Springs' growth market - means more competition for every online customer. Pierson Digital helps Colorado businesses dominate local search, run profitable ads, and convert more web traffic into revenue." },
  @{ name="Connecticut"; slug="connecticut"; cities="Hartford, Bridgeport, New Haven, Stamford, and Waterbury"
     intro="Connecticut's dense population and proximity to major metro markets makes it one of the most competitive states for local business. From Hartford and New Haven to the affluent Stamford market, Pierson Digital helps Connecticut businesses rise above the competition with strategic SEO, ads, and digital systems." },
  @{ name="Delaware"; slug="delaware"; cities="Wilmington, Dover, Newark, Middletown, and Smyrna"
     intro="Delaware's compact size belies its competitive business environment. From Wilmington's financial district to the growing suburbs of Newark and Middletown, Delaware businesses need a strong digital presence to win customers. Pierson Digital delivers exactly that, without the agency overhead." },
  @{ name="Florida"; slug="florida"; cities="Miami, Orlando, Tampa, Jacksonville, and Fort Lauderdale"
     intro="Florida is one of the most dynamic markets in the US. Miami's international business scene, Orlando's tourism and services economy, Tampa's growing tech sector, and Jacksonville's sprawl all create unique digital marketing challenges. Pierson Digital builds Florida businesses the online presence they need to compete and win." },
  @{ name="Georgia"; slug="georgia"; cities="Atlanta, Augusta, Savannah, Columbus, and Macon"
     intro="Atlanta alone is home to hundreds of thousands of businesses, and cities like Augusta, Savannah, Columbus, and Macon are growing fast. Georgia companies need more than a website - they need a full digital strategy that drives real revenue. That is what Pierson Digital delivers." },
  @{ name="Hawaii"; slug="hawaii"; cities="Honolulu, Hilo, Kailua, Kona, and Pearl City"
     intro="Hawaii's business environment is unlike anywhere else in the country. From Honolulu's competitive commercial districts to the growing communities on the Big Island around Hilo and Kona, Hawaii businesses need a digital strategy that speaks to both local customers and the visitors who drive so much of the state's economy." },
  @{ name="Idaho"; slug="idaho"; cities="Boise, Meridian, Nampa, Idaho Falls, and Pocatello"
     intro="Idaho is one of the fastest-growing states in the nation. The Treasure Valley - Boise, Meridian, and Nampa - is booming, and businesses throughout Idaho Falls, Pocatello, and beyond are facing new competitive pressure. Pierson Digital helps Idaho businesses get found online and convert that traffic into customers." },
  @{ name="Illinois"; slug="illinois"; cities="Chicago, Aurora, Naperville, Joliet, and Rockford"
     intro="From Chicago's world-class business community to the competitive suburbs of Naperville, Aurora, and Joliet, Illinois businesses face intense digital competition. Whether you're in a major metro or a regional market like Rockford or Peoria, Pierson Digital gives Illinois companies the digital edge to win more customers online." },
  @{ name="Indiana"; slug="indiana"; cities="Indianapolis, Fort Wayne, Evansville, South Bend, and Carmel"
     intro="Indiana's diverse economy spans manufacturing in Fort Wayne, healthcare in Indianapolis, higher education in South Bend, and thriving suburbs like Carmel. Pierson Digital helps Indiana businesses across every sector build digital strategies that bring in more customers and more revenue." },
  @{ name="Iowa"; slug="iowa"; cities="Des Moines, Cedar Rapids, Davenport, Sioux City, and Iowa City"
     intro="Iowa's economy is anchored by Des Moines' growing business hub and the diverse markets of Cedar Rapids, Davenport, Sioux City, and Iowa City. Pierson Digital helps Iowa businesses build a strong online presence, from local SEO that brings in nearby customers to digital systems that automate lead follow-up." },
  @{ name="Kansas"; slug="kansas"; cities="Wichita, Overland Park, Kansas City, Topeka, and Olathe"
     intro="Wichita's industrial and aerospace economy, Overland Park's thriving suburbs, and the Kansas side of the Kansas City metro create a diverse and competitive business environment. Pierson Digital helps Kansas companies rank higher, reach better-targeted audiences, and turn their online presence into a revenue machine." },
  @{ name="Kentucky"; slug="kentucky"; cities="Louisville, Lexington, Bowling Green, Owensboro, and Covington"
     intro="Kentucky's economy runs from Louisville's diverse commercial center to Lexington's healthcare and education hub, with growing markets in Bowling Green, Owensboro, and Northern Kentucky near Cincinnati. Pierson Digital gives Kentucky businesses the digital marketing firepower to compete with anyone." },
  @{ name="Louisiana"; slug="louisiana"; cities="New Orleans, Baton Rouge, Shreveport, Lafayette, and Lake Charles"
     intro="Louisiana's economy is as diverse as its culture. New Orleans' hospitality sector, Baton Rouge's energy corridors, and the commercial centers of Shreveport, Lafayette, and Lake Charles all compete intensely for online customers. Pierson Digital helps Louisiana businesses win that competition." },
  @{ name="Maine"; slug="maine"; cities="Portland, Lewiston, Bangor, Auburn, and Biddeford"
     intro="Maine's economy is driven by tourism, healthcare, fishing, and a growing technology sector centered around Portland and Lewiston. From coastal communities to inland cities like Bangor and Auburn, Maine businesses need a digital presence that reaches local customers year-round. Pierson Digital delivers exactly that." },
  @{ name="Maryland"; slug="maryland"; cities="Baltimore, Columbia, Germantown, Silver Spring, and Waldorf"
     intro="Maryland's position between Washington DC and the mid-Atlantic corridor makes it one of the most competitive small-business markets in the country. From Baltimore's diverse economy to the booming suburbs of Columbia, Silver Spring, and Waldorf, Maryland businesses need sharp digital marketing to cut through the noise." },
  @{ name="Massachusetts"; slug="massachusetts"; cities="Boston, Worcester, Springfield, Cambridge, and Lowell"
     intro="Massachusetts is home to some of the most educated and digitally savvy consumers in the world. From Boston's innovation economy and Cambridge's research corridors to the commercial centers of Worcester, Springfield, and Lowell, Massachusetts businesses must work hard to stand out online. Pierson Digital makes that happen." },
  @{ name="Michigan"; slug="michigan"; cities="Detroit, Grand Rapids, Warren, Lansing, and Ann Arbor"
     intro="Michigan's economy is resurgent. Detroit's automotive revival, Grand Rapids' manufacturing and healthcare growth, and the innovation hubs of Ann Arbor and Lansing are creating intense competition for local customers. Pierson Digital helps Michigan businesses build the digital infrastructure to win." },
  @{ name="Minnesota"; slug="minnesota"; cities="Minneapolis, Saint Paul, Rochester, Duluth, and Bloomington"
     intro="The Twin Cities of Minneapolis and Saint Paul represent one of the strongest regional economies in the Midwest. Combined with Rochester's healthcare hub, Duluth's port economy, and the commercial sprawl of Bloomington, Minnesota businesses face fierce digital competition. Pierson Digital helps them compete and win." },
  @{ name="Mississippi"; slug="mississippi"; cities="Jackson, Gulfport, Biloxi, Hattiesburg, and Southaven"
     intro="Mississippi businesses in Jackson, Gulfport, Biloxi, Hattiesburg, and the Memphis suburb of Southaven serve customers who are increasingly searching online first. Pierson Digital helps Mississippi companies build the digital presence they need to capture that demand, with SEO, ads, websites, and automation that works." },
  @{ name="Missouri"; slug="missouri"; cities="Kansas City, St. Louis, Springfield, Columbia, and Independence"
     intro="Missouri's two major metros, Kansas City and St. Louis, represent two of the Midwest's most competitive markets. With strong regional economies in Springfield and Columbia too, Missouri businesses need a digital strategy that performs. Pierson Digital delivers exactly that: SEO, ads, websites, and CRM built for growth." },
  @{ name="Montana"; slug="montana"; cities="Billings, Missoula, Great Falls, Bozeman, and Butte"
     intro="Montana's wide geography and tight-knit communities create unique marketing opportunities. From Billings' commercial center to Missoula's university-driven economy, the rapidly growing Bozeman market, and Great Falls and Butte, Montana businesses benefit from smart digital marketing that puts them in front of local customers first." },
  @{ name="Nebraska"; slug="nebraska"; cities="Omaha, Lincoln, Bellevue, Grand Island, and Kearney"
     intro="Nebraska's economy centers on Omaha's growing business district and Lincoln's government, education, and healthcare sectors. Businesses in Bellevue, Grand Island, and Kearney serve markets that are increasingly searching online. Pierson Digital helps Nebraska companies get found first and convert more of that traffic into revenue." },
  @{ name="Nevada"; slug="nevada"; cities="Las Vegas, Henderson, Reno, North Las Vegas, and Sparks"
     intro="Nevada's business environment is as dynamic as its reputation. Las Vegas and Henderson form one of the most competitive service markets in the country, while Reno and Sparks are experiencing explosive growth. Pierson Digital helps Nevada businesses cut through the competition with sharp SEO, targeted ads, and conversion-focused websites." },
  @{ name="New Hampshire"; slug="new-hampshire"; cities="Manchester, Nashua, Concord, Derry, and Dover"
     intro="New Hampshire's proximity to Boston and its tax-friendly environment attract businesses at every stage. Manchester, Nashua, Concord, and the growing communities of Derry and Dover are all competitive markets for local search. Pierson Digital helps New Hampshire businesses show up where their customers are searching." },
  @{ name="New Jersey"; slug="new-jersey"; cities="Newark, Jersey City, Paterson, Trenton, and Edison"
     intro="New Jersey is one of the most densely populated states in the country, which means intense competition for every local business. From Newark and Jersey City in the metro, to Paterson, Trenton, and Edison's diverse markets, Pierson Digital helps New Jersey businesses dominate local search and convert more leads." },
  @{ name="New Mexico"; slug="new-mexico"; cities="Albuquerque, Las Cruces, Rio Rancho, Santa Fe, and Roswell"
     intro="New Mexico's growing cities, Albuquerque, Las Cruces, Rio Rancho, Santa Fe, and Roswell, represent an increasingly competitive digital landscape. Pierson Digital helps New Mexico businesses rank on page 1, run profitable ad campaigns, and build the digital infrastructure to capture and convert more local customers." },
  @{ name="New York"; slug="new-york"; cities="New York City, Buffalo, Rochester, Yonkers, and Syracuse"
     intro="New York is the most competitive digital market in the world. From the five boroughs of New York City to the regional markets of Buffalo, Rochester, Yonkers, and Syracuse, every business needs a serious digital strategy just to be visible. Pierson Digital builds that strategy, from SEO that ranks to ads that convert." },
  @{ name="North Carolina"; slug="north-carolina"; cities="Charlotte, Raleigh, Greensboro, Durham, and Winston-Salem"
     intro="North Carolina's explosive growth, Charlotte's financial center, the Research Triangle of Raleigh and Durham, and the commercial markets of Greensboro and Winston-Salem, creates enormous opportunity and intense competition. Pierson Digital helps North Carolina businesses build the digital presence to win their market." },
  @{ name="North Dakota"; slug="north-dakota"; cities="Fargo, Bismarck, Grand Forks, Minot, and West Fargo"
     intro="North Dakota's economy has diversified significantly beyond energy, and cities like Fargo, Bismarck, Grand Forks, and Minot are home to growing business communities. Pierson Digital helps North Dakota businesses build strong digital presences that capture local customers and drive consistent growth." },
  @{ name="Ohio"; slug="ohio"; cities="Columbus, Cleveland, Cincinnati, Toledo, and Akron"
     intro="Ohio has five major metros: Columbus, Cleveland, Cincinnati, Toledo, and Akron, each with dense, competitive business communities. Whether you're a local service business or a regional company, Pierson Digital gives Ohio businesses the SEO, ads, and digital systems they need to win more customers online." },
  @{ name="Oklahoma"; slug="oklahoma"; cities="Oklahoma City, Tulsa, Norman, Edmond, and Broken Arrow"
     intro="Oklahoma's business landscape spans Oklahoma City's diverse commercial hub, Tulsa's energy and cultural economy, and the growing suburbs of Norman, Edmond, and Broken Arrow. Pierson Digital helps Oklahoma businesses build the digital presence to win in these competitive local markets and beyond." },
  @{ name="Oregon"; slug="oregon"; cities="Portland, Eugene, Salem, Gresham, and Hillsboro"
     intro="Oregon's economy is powered by Portland's tech and creative industries, Eugene's university-driven market, and the Willamette Valley commerce centers of Salem, Gresham, and Hillsboro. Pierson Digital helps Oregon businesses cut through the digital noise with proven SEO, targeted ads, and conversion-focused websites." },
  @{ name="Pennsylvania"; slug="pennsylvania"; cities="Philadelphia, Pittsburgh, Allentown, Erie, and Reading"
     intro="Pennsylvania's two major metro areas, Philadelphia and Pittsburgh, are among the most competitive business markets on the East Coast. With strong regional centers in Allentown, Erie, and Reading, Pennsylvania businesses need sharp digital marketing to stand out. Pierson Digital delivers the strategy and execution to make that happen." },
  @{ name="Rhode Island"; slug="rhode-island"; cities="Providence, Cranston, Warwick, Pawtucket, and East Providence"
     intro="Rhode Island may be the smallest state, but its business markets in Providence, Cranston, Warwick, Pawtucket, and East Providence are fiercely competitive. Pierson Digital helps Rhode Island businesses rank higher in local search, run smarter ad campaigns, and build websites that turn visitors into paying customers." },
  @{ name="South Carolina"; slug="south-carolina"; cities="Columbia, Charleston, North Charleston, Greenville, and Spartanburg"
     intro="South Carolina's rapid growth, Charleston's booming economy, Greenville and Spartanburg's manufacturing resurgence, and Columbia's government and university markets, creates intense competition for local customers. Pierson Digital helps South Carolina businesses build the digital infrastructure to capture that demand." },
  @{ name="South Dakota"; slug="south-dakota"; cities="Sioux Falls, Rapid City, Aberdeen, Brookings, and Watertown"
     intro="South Dakota's business environment, led by Sioux Falls' financial and healthcare sectors and Rapid City's tourism-adjacent economy, is increasingly digital. Pierson Digital helps businesses in Sioux Falls, Rapid City, Aberdeen, Brookings, and Watertown get found online and convert more local searches into revenue." },
  @{ name="Tennessee"; slug="tennessee"; cities="Nashville, Memphis, Knoxville, Chattanooga, and Clarksville"
     intro="Tennessee is one of the hottest economies in the South. Nashville's explosive growth, Memphis's logistics and healthcare sectors, and the strong regional markets of Knoxville, Chattanooga, and Clarksville all create fierce competition for local business. Pierson Digital helps Tennessee businesses rise to the top." },
  @{ name="Texas"; slug="texas"; cities="Houston, San Antonio, Dallas, Austin, and Fort Worth"
     intro="Texas is one of the largest and most competitive business markets in the world. Houston's energy sector, Austin's tech scene, Dallas and Fort Worth's commercial corridors, and San Antonio's diverse economy all demand a digital strategy that performs at scale. Pierson Digital builds exactly that for Texas businesses." },
  @{ name="Utah"; slug="utah"; cities="Salt Lake City, West Valley City, Provo, Ogden, and Orem"
     intro="Utah's Silicon Slopes tech corridor and the booming Wasatch Front, Salt Lake City, Provo, Orem, Ogden, and West Valley City, make it one of the most dynamic business environments in the Mountain West. Pierson Digital helps Utah businesses compete in this fast-moving market with SEO, ads, and digital systems that scale." },
  @{ name="Vermont"; slug="vermont"; cities="Burlington, South Burlington, Rutland, Barre, and Montpelier"
     intro="Vermont's small but vibrant business community, from Burlington's commercial core to South Burlington, Rutland, Barre, and Montpelier, is increasingly looking online to find local services. Pierson Digital helps Vermont businesses build digital presences that capture that search intent and turn it into real revenue." },
  @{ name="Virginia"; slug="virginia"; cities="Virginia Beach, Norfolk, Chesapeake, Richmond, and Arlington"
     intro="Virginia's diverse economy spans Northern Virginia's government contracting hub near Arlington, Richmond's business community, and the Hampton Roads metro of Virginia Beach, Norfolk, and Chesapeake. Pierson Digital helps Virginia businesses in every market build the digital foundation to attract, convert, and retain more customers." },
  @{ name="Washington"; slug="washington"; cities="Seattle, Spokane, Tacoma, Vancouver, and Bellevue"
     intro="Washington State's tech-forward economy, anchored by Seattle and Bellevue's innovation corridor, combined with the regional markets of Spokane, Tacoma, and Vancouver creates one of the most digitally competitive environments in the country. Pierson Digital helps Washington businesses rank, advertise, and convert at a level that matches the market." },
  @{ name="West Virginia"; slug="west-virginia"; cities="Charleston, Huntington, Parkersburg, Morgantown, and Wheeling"
     intro="West Virginia's economy is evolving, with Charleston's state government and business hub, Morgantown's university-driven growth, and the commercial centers of Huntington, Parkersburg, and Wheeling all representing real opportunity for businesses willing to invest in their digital presence. Pierson Digital helps West Virginia businesses capture that opportunity." },
  @{ name="Wisconsin"; slug="wisconsin"; cities="Milwaukee, Madison, Green Bay, Kenosha, and Racine"
     intro="Wisconsin's economy spans Milwaukee's industrial and healthcare sectors, Madison's government and university markets, Green Bay's diverse business community, and the Lake Michigan corridor of Kenosha and Racine. Pierson Digital helps Wisconsin businesses build digital strategies that win customers across every one of these markets." },
  @{ name="Wyoming"; slug="wyoming"; cities="Cheyenne, Casper, Laramie, Gillette, and Rock Springs"
     intro="Wyoming's energy-driven economy and wide-open geography create unique digital marketing opportunities. From Cheyenne's capital city commerce to Casper's oil-and-gas services market, Laramie's university town economy, and the energy hubs of Gillette and Rock Springs, Pierson Digital helps Wyoming businesses get found and win online." }
)

$tpl = @'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Digital Marketing Agency in STATENAME | SEO, Ads &amp; Websites | Pierson Digital</title>
  <meta name="description" content="Pierson Digital serves businesses in CITIES with SEO, Meta Ads, custom websites, and CRM automation. No contracts. Results-driven digital marketing in STATENAME.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=Barlow:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="icon" type="image/png" href="../assets/logo.png">
  <link rel="stylesheet" href="../assets/css/styles.css">
  <script>
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('init','1478279757334117');fbq('track','PageView');
  </script>
  <noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1478279757334117&ev=PageView&noscript=1"/></noscript>
  <script type="application/ld+json">
  {"@context":"https://schema.org","@type":"LocalBusiness","name":"Pierson Digital","url":"https://piersondigitalmarketing.com","description":"Digital marketing agency serving STATENAME with SEO, Meta Ads, websites, and CRM.","address":{"@type":"PostalAddress","addressRegion":"STATENAME","addressCountry":"US"},"areaServed":"STATENAME"}
  </script>
</head>
<body>

<header id="site-header">
  <nav class="site-nav">
    <a href="/" class="logo">Pierson <span>Digital</span></a>
    <div class="nav-menu" id="nav-menu">
      <a href="/" class="nav-item">Home</a>
      <div class="has-dropdown">
        <button class="drop-toggle">Services</button>
        <div class="dropdown">
          <a href="/seo">SEO</a>
          <a href="/meta-ads">Meta Ads</a>
          <a href="/websites">Websites</a>
          <a href="/crm">CRM</a>
        </div>
      </div>
      <a href="/champaign" class="nav-item">Champaign, IL</a>
    </div>
    <a href="/#book" class="nav-cta">Book a Call</a>
    <button class="nav-toggle" id="nav-toggle" aria-label="Open menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </nav>
</header>

<div class="inner-hero inner-hero--plain">
  <div class="inner-hero__inner">
    <div class="inner-hero__eyebrow">STATENAME</div>
    <h1 class="inner-hero__title">Digital Marketing Agency<br><span class="accent">in STATENAME</span></h1>
    <p class="inner-hero__sub">SEO, Meta Ads, custom websites, and CRM automation &mdash; serving businesses in CITIES and throughout STATENAME.</p>
    <div class="btn-group">
      <a href="#book" class="btn-primary">Book a Free Call</a>
      <a href="#services" class="btn-secondary">Our Services</a>
    </div>
  </div>
</div>

<section class="nsection">
  <div class="nsection__inner">
    <div class="nsection__header reveal">
      <div class="section-label">STATENAME</div>
      <div class="section-title">Digital Marketing<br><span class="accent">in STATENAME</span></div>
      <p class="section-body">INTRO</p>
    </div>
    <div class="why-grid" style="margin-top:48px;">
      <div class="why-card reveal delay-1">
        <div class="why-card__num">01</div>
        <div class="why-card__title">Local SEO That Ranks</div>
        <div class="why-card__body">We target the exact keywords your STATENAME customers are searching &mdash; and build the on-page, technical, and local SEO foundation to rank and stay there.</div>
      </div>
      <div class="why-card reveal delay-2">
        <div class="why-card__num">02</div>
        <div class="why-card__title">STATENAME Ad Campaigns</div>
        <div class="why-card__body">Meta Ads campaigns precisely targeted to STATENAME audiences &mdash; the right people, in the right cities, at the right time. Every dollar measured.</div>
      </div>
      <div class="why-card reveal delay-3">
        <div class="why-card__num">03</div>
        <div class="why-card__title">Live in 5&ndash;7 Days</div>
        <div class="why-card__body">Custom websites built for STATENAME businesses &mdash; SEO-optimized from day one, mobile-first, and live in less than a week. $97/mo or buy outright for $1,000.</div>
      </div>
    </div>
  </div>
</section>

<div class="gradient-divider"></div>

<section class="nsection nsection--alt" id="services">
  <div class="nsection__inner">
    <div class="nsection__header--center reveal">
      <div class="section-label">Our Services</div>
      <div class="section-title">Everything You Need<br><span class="accent">to Win Online in STATENAME</span></div>
    </div>
    <div class="services-grid">
      <a href="/seo" class="svc-card reveal delay-1">
        <div class="svc-card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="#7BAAF7" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg></div>
        <div class="svc-card__price">From $997/mo</div>
        <div class="svc-card__title">SEO</div>
        <div class="svc-card__body">Rank for your service + STATENAME on Google. Includes a free custom website. Local SEO, content, and backlinks built for your market.</div>
        <div class="svc-card__cta">Learn More</div>
      </a>
      <a href="/meta-ads" class="svc-card reveal delay-2">
        <div class="svc-card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="#7BAAF7" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg></div>
        <div class="svc-card__price">From $997/mo</div>
        <div class="svc-card__title">Meta Ads</div>
        <div class="svc-card__body">Facebook and Instagram campaigns built to reach STATENAME customers. Full creative, targeting, and campaign management included.</div>
        <div class="svc-card__cta">Learn More</div>
      </a>
      <a href="/websites" class="svc-card reveal delay-3">
        <div class="svc-card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="#7BAAF7" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg></div>
        <div class="svc-card__price">$97/mo or $1,000 outright</div>
        <div class="svc-card__title">Websites</div>
        <div class="svc-card__body">Custom, SEO-optimized websites for STATENAME businesses. Mobile-first, fast, and live in 5&ndash;7 business days.</div>
        <div class="svc-card__cta">Learn More</div>
      </a>
      <a href="/crm" class="svc-card reveal delay-4">
        <div class="svc-card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="#7BAAF7" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.12 1.18 2 2 0 012.1 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg></div>
        <div class="svc-card__price">$297/mo</div>
        <div class="svc-card__title">CRM &amp; Automation</div>
        <div class="svc-card__body">Missed-call text-back, AI chat, review automation, and full CRM. Trusted by 10,000+ companies. One-time $750 setup fee.</div>
        <div class="svc-card__cta">Learn More</div>
      </a>
    </div>
  </div>
</section>

<div class="gradient-divider"></div>

<section class="nsection" id="pricing">
  <div class="nsection__inner">
    <div class="nsection__header--center reveal">
      <div class="section-label">Pricing</div>
      <div class="section-title">Transparent Pricing.<br><span class="accent">No Surprises.</span></div>
      <p class="section-body" style="margin:0 auto;">Month-to-month. No setup fees except where noted. No contracts.</p>
    </div>
    <div class="nprice-grid" style="margin-top:48px;">
      <div class="nprice-card featured reveal delay-1">
        <div class="nprice-badge">Most Popular</div>
        <div class="nprice-service">SEO</div>
        <div class="nprice-amount"><sup>$</sup>997</div>
        <div class="nprice-period">per month</div>
        <div class="nprice-strikethrough">regularly $1,497/mo</div>
        <div class="nprice-note">FREE WEBSITE INCLUDED</div>
        <ul class="nprice-list">
          <li><span class="check">&#10003;</span> Custom SEO-Optimized Website (FREE)</li>
          <li><span class="check">&#10003;</span> On-Page &amp; Technical SEO</li>
          <li><span class="check">&#10003;</span> Local SEO &amp; Google Business Profile</li>
          <li><span class="check">&#10003;</span> Monthly Content &amp; Blog Posts</li>
          <li><span class="check">&#10003;</span> Backlink Building</li>
          <li><span class="check">&#10003;</span> No Contract</li>
        </ul>
        <a href="#book" class="nprice-cta">Get Started</a>
      </div>
      <div class="nprice-card reveal delay-2">
        <div class="nprice-service">Meta Ads</div>
        <div class="nprice-amount"><sup>$</sup>997</div>
        <div class="nprice-period">per month</div>
        <div class="nprice-strikethrough">regularly $1,497/mo</div>
        <ul class="nprice-list">
          <li><span class="check">&#10003;</span> Facebook &amp; Instagram Campaigns</li>
          <li><span class="check">&#10003;</span> Audience Targeting &amp; Creative</li>
          <li><span class="check">&#10003;</span> A/B Testing &amp; Optimization</li>
          <li><span class="check">&#10003;</span> Weekly Reporting</li>
          <li><span class="check">&#10003;</span> No Contract</li>
        </ul>
        <a href="#book" class="nprice-cta">Get Started</a>
      </div>
      <div class="nprice-card reveal delay-3">
        <div class="nprice-service">Websites</div>
        <div class="nprice-amount"><sup>$</sup>97</div>
        <div class="nprice-period">per month</div>
        <div class="nprice-note">Or buy outright for $1,000</div>
        <ul class="nprice-list">
          <li><span class="check">&#10003;</span> Custom Design</li>
          <li><span class="check">&#10003;</span> SEO-Optimized</li>
          <li><span class="check">&#10003;</span> Mobile-First &amp; Fast</li>
          <li><span class="check">&#10003;</span> Hosting &amp; Maintenance</li>
          <li><span class="check">&#10003;</span> Live in 5&ndash;7 Days</li>
        </ul>
        <a href="#book" class="nprice-cta">Get Started</a>
      </div>
      <div class="nprice-card reveal delay-4">
        <div class="nprice-service">CRM &amp; Automation</div>
        <div class="nprice-amount"><sup>$</sup>297</div>
        <div class="nprice-period">per month</div>
        <div class="nprice-note">+ One-Time $750 Startup Fee</div>
        <div class="nprice-strikethrough">regularly $500/mo</div>
        <ul class="nprice-list">
          <li><span class="check">&#10003;</span> Missed-Call Text-Back</li>
          <li><span class="check">&#10003;</span> AI Chat 24/7</li>
          <li><span class="check">&#10003;</span> Review Automation</li>
          <li><span class="check">&#10003;</span> Full CRM on Your Phone</li>
          <li><span class="check">&#10003;</span> 10,000+ Companies Trust Us</li>
        </ul>
        <a href="#book" class="nprice-cta">Get Started</a>
      </div>
    </div>
  </div>
</section>

<section class="nsection nsection--alt" id="book">
  <div class="nsection__inner">
    <div class="ghl-section" style="max-width:960px;">
      <div class="nsection__header--center reveal">
        <div class="section-label">Book a Call</div>
        <div class="section-title">Grow Your STATENAME<br><span class="accent">Business Starting Now</span></div>
        <p class="section-body" style="margin:0 auto 32px;">15 minutes. We&rsquo;ll review your current digital presence and outline exactly what we&rsquo;d do to grow your business in STATENAME.</p>
      </div>
      <div class="ghl-calendar-wrap">
        <iframe src="https://api.leadconnectorhq.com/widget/booking/svYXBBLLQuy6KLwj50sb" style="width:100%;border:none;overflow:hidden;" scrolling="no" id="cal-SLUG"></iframe>
      </div>
    </div>
  </div>
</section>

<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-top">
      <div class="footer-brand">
        <div class="footer-logo">Pierson <span>Digital</span></div>
        <p>Full-service digital marketing &mdash; SEO, Meta Ads, Websites &amp; CRM &mdash; serving businesses nationwide.</p>
        <a href="/#book" class="btn-primary" style="font-size:16px;padding:14px 28px;display:inline-block;margin-top:4px;">Book a Free Call</a>
      </div>
      <div class="footer-cols">
        <div class="footer-col">
          <h4>Services</h4>
          <a href="/seo">SEO</a>
          <a href="/meta-ads">Meta Ads</a>
          <a href="/websites">Websites</a>
          <a href="/crm">CRM</a>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <a href="/">Home</a>
          <a href="/#pricing">Pricing</a>
          <a href="/#book">Book a Call</a>
          <a href="/champaign">Champaign, IL</a>
        </div>
        <div class="footer-col">
          <h4>Locations</h4>
          <div class="footer-states">
            <a href="/alabama">Alabama</a><a href="/alaska">Alaska</a><a href="/arizona">Arizona</a>
            <a href="/arkansas">Arkansas</a><a href="/california">California</a><a href="/colorado">Colorado</a>
            <a href="/connecticut">Connecticut</a><a href="/delaware">Delaware</a><a href="/florida">Florida</a>
            <a href="/georgia">Georgia</a><a href="/hawaii">Hawaii</a><a href="/idaho">Idaho</a>
            <a href="/illinois">Illinois</a><a href="/indiana">Indiana</a><a href="/iowa">Iowa</a>
            <a href="/kansas">Kansas</a><a href="/kentucky">Kentucky</a><a href="/louisiana">Louisiana</a>
            <a href="/maine">Maine</a><a href="/maryland">Maryland</a><a href="/massachusetts">Massachusetts</a>
            <a href="/michigan">Michigan</a><a href="/minnesota">Minnesota</a><a href="/mississippi">Mississippi</a>
            <a href="/missouri">Missouri</a><a href="/montana">Montana</a><a href="/nebraska">Nebraska</a>
            <a href="/nevada">Nevada</a><a href="/new-hampshire">New Hampshire</a><a href="/new-jersey">New Jersey</a>
            <a href="/new-mexico">New Mexico</a><a href="/new-york">New York</a><a href="/north-carolina">North Carolina</a>
            <a href="/north-dakota">North Dakota</a><a href="/ohio">Ohio</a><a href="/oklahoma">Oklahoma</a>
            <a href="/oregon">Oregon</a><a href="/pennsylvania">Pennsylvania</a><a href="/rhode-island">Rhode Island</a>
            <a href="/south-carolina">South Carolina</a><a href="/south-dakota">South Dakota</a><a href="/tennessee">Tennessee</a>
            <a href="/texas">Texas</a><a href="/utah">Utah</a><a href="/vermont">Vermont</a>
            <a href="/virginia">Virginia</a><a href="/washington">Washington</a><a href="/west-virginia">West Virginia</a>
            <a href="/wisconsin">Wisconsin</a><a href="/wyoming">Wyoming</a>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2025 Pierson Digital. All rights reserved. | piersondigitalmarketing.com</p>
      <p>This site is not affiliated with Meta (Facebook) or Google. Results may vary.</p>
    </div>
  </div>
</footer>

<script src="../assets/js/main.js"></script>
</body>
</html>
'@

$count = 0
foreach ($state in $states) {
  $html = $tpl `
    -replace 'STATENAME', $state.name `
    -replace 'SLUG',      $state.slug `
    -replace 'CITIES',    $state.cities `
    -replace 'INTRO',     $state.intro

  $outPath = Join-Path $base "$($state.slug)\index.html"
  [System.IO.File]::WriteAllText($outPath, $html, [System.Text.UTF8Encoding]::new($false))
  $count++
}

Write-Host "Generated $count state pages."
