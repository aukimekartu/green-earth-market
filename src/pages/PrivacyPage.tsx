import { useLanguage } from '@/i18n/LanguageContext';

const content = {
  lt: {
    title: 'Privatumo politika',
    sections: [
      { heading: 'Asmens duomenų tvarkymas', text: 'NaturaVida gerbia jūsų privatumą ir įsipareigoja saugoti jūsų asmens duomenis. Ši privatumo politika paaiškina, kaip renkame, naudojame ir saugome jūsų informaciją.' },
      { heading: 'Slapukai', text: 'Mūsų svetainė naudoja slapukus, kad pagerintų jūsų naršymo patirtį. Slapukai – tai maži tekstiniai failai, saugomi jūsų naršyklėje. Naudojame būtinus slapukus (pvz., kalbos nustatymai) ir analitinius slapukus.' },
      { heading: 'Jūsų teisės', text: 'Pagal BDAR turite teisę prašyti prieigos prie savo duomenų, juos ištaisyti ar ištrinti. Taip pat galite atsisakyti duomenų tvarkymo ar apriboti jų naudojimą.' },
      { heading: 'Kontaktai', text: 'Jei turite klausimų dėl privatumo, susisiekite su mumis el. paštu: info@naturavida.lt' },
    ],
  },
  en: {
    title: 'Privacy Policy',
    sections: [
      { heading: 'Personal Data Processing', text: 'NaturaVida respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use and store your information.' },
      { heading: 'Cookies', text: 'Our website uses cookies to improve your browsing experience. Cookies are small text files stored in your browser. We use essential cookies (e.g., language settings) and analytical cookies.' },
      { heading: 'Your Rights', text: 'Under GDPR you have the right to request access to your data, rectification or deletion. You can also object to processing or restrict the use of your data.' },
      { heading: 'Contact', text: 'If you have questions about privacy, please contact us at: info@naturavida.lt' },
    ],
  },
  lv: {
    title: 'Privātuma politika',
    sections: [
      { heading: 'Personas datu apstrāde', text: 'NaturaVida ciena jūsu privātumu un apņemas aizsargāt jūsu personas datus. Šī privātuma politika izskaidro, kā mēs apkopojam, izmantojam un glabājam jūsu informāciju.' },
      { heading: 'Sīkdatnes', text: 'Mūsu vietne izmanto sīkdatnes, lai uzlabotu jūsu pārlūkošanas pieredzi. Sīkdatnes ir nelieli teksta faili, kas tiek saglabāti jūsu pārlūkprogrammā.' },
      { heading: 'Jūsu tiesības', text: 'Saskaņā ar GDPR jums ir tiesības pieprasīt piekļuvi saviem datiem, tos labot vai dzēst.' },
      { heading: 'Kontakti', text: 'Ja jums ir jautājumi par privātumu, sazinieties ar mums: info@naturavida.lt' },
    ],
  },
};

const PrivacyPage = () => {
  const { lang } = useLanguage();
  const c = content[lang];

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-4xl md:text-5xl text-foreground mb-8">{c.title}</h1>
      <div className="space-y-8">
        {c.sections.map((s, i) => (
          <section key={i}>
            <h2 className="text-2xl text-foreground mb-3">{s.heading}</h2>
            <p className="text-muted-foreground font-sans leading-relaxed">{s.text}</p>
          </section>
        ))}
      </div>
    </div>
  );
};

export default PrivacyPage;
