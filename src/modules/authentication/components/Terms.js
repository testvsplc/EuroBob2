// REACT
import React, { Component } from 'react';

// COMPONENTS
import { Header } from '../../../components/';

// ROUTER
import { Actions } from 'react-native-router-flux';

// REACT-NATIVE
import {
    View,
    Text,
    Image,
    TextInput,
    ScrollView
} from 'react-native';

// IMAGES
import closeModal from '../../../img/plan-ride/navBar-closeButton-dark.png';

// STYLES
import styles from '../styles/terms';

// TRANSLATION
import translation from '../../../translations/nl';

class Terms extends Component {
    static renderNavigationBar (props) {
        return (
            <Header
                leftButtonText={
                    <Image
                        source={closeModal}
                        key={closeModal}
                    />
                }
                leftButtonAction={() => Actions.pop()}
                navigationState={props.navigationState}
                logo={false}
                title={props.title}
            />
        );
    }

    renderTerms () {
        const terms = [
            {
                title: 'Artikel 1. Toepasselijkheid',
                sections: [
                    {
                        title: '1.1',
                        content: 'Deze Algemene Voorwaarden zijn van toepassing op al onze aanbiedingen, opdrachten en overeenkomsten voor zover een en ander betrekking heeft op het werkgebied van Euro Bob (chauffeursdiensten en dienstverlening).'
                    },
                    {
                        title: '1.2',
                        content: 'Algemene voorwaarden van de wederpartij gaan slechts geheel of gedeeltelijk van de overeenkomst deel uitmaken, indien zij nadrukkelijk door Euro Bob zijn aanvaard.'
                    },
                    {
                        title: '1.3',
                        content: 'Indien mocht blijken dat een of meerdere artikelen van de overeenkomst nietig of onverbindend zijn, tast dit niet de verbondenheid aan van de overige bepalingen van deze overeenkomst'
                    }
                ]
            },
            {
                title: 'Artikel 2. Definitie',
                sections: [
                    {
                        title: '2.1',
                        content: 'In deze bedingen hebben de volgende termen de erachter vermelde definities: '
                    },
                    {
                        title: '2.2',
                        content: 'Euro Bob / wij / ons: Euro Bob'
                    },
                    {
                        title: '2.3',
                        content: 'De chauffeur: een bij Euro Bob, of een door haar aangewezen derde partij, ingeschreven natuurlijke persoon met wie wij op aanvragen bemiddelen.'
                    },
                    {
                        title: '2.4',
                        content: 'Chauffeursdienst: de door ons ter beschikking gestelde arbeidskracht.'
                    },
                    {
                        title: '2.5',
                        content: 'Opdracht: de overeenkomst tussen ons en de klant op grond waarvan wij in de vraag van de klant naar chauffeursdienst voorzien door (en in zoverre telkens) (een) chauffeursdienst(en) aan de klant aanbieden daaronder mede begrepen de overeenkomst die wordt voortgezet ten aanzien van een vervangende chauffeursdienst.'
                    },
                    {
                        title: '2.6',
                        content: 'Chauffeurtijd: de tijd die een chauffeur rijdend in de auto van de wederpartij doorbrengt'
                    },
                    {
                        title: '2.7',
                        content: 'Wachttijd: de tijd die een chauffeur wachtend ten behoeve van de wederpartij doorbrengt '
                    },
                    {
                        title: '2.8',
                        content: 'Reistijd: de tijd die een chauffeur reizend van en/of naar het overeengekomen adres doorbrengt.'
                    },
                    {
                        title: '2.9',
                        content: 'Wederpartij: natuurlijk of -rechtspersoon waarmee Euro Bob een overeenkomst van dienstverlening heeft.'
                    },
                    {
                        title: '2.10',
                        content: 'Tarief: het tarief dat wij aan de klant voor onze diensten, in rekening brengen, per rit, per kilometer, per uur of zoals overeengekomen en eventueel nadien aangepast conform opdracht en voorwaarden. '
                    },
                    {
                        title: '2.11',
                        content: 'Totaaltarief: een bij afzonderlijke overeenkomst overeengekomen totaalbedrag dat wij aan de klant in rekening brengen voor al onze diensten die verbonden zijn aan een bepaalde opdracht, behoudens nadien aangepast conform opdracht en voorwaarden. '
                    }
                ]
            },
            {
                title: 'Artikel 3. Totstandkoming overeenkomst',
                sections: [
                    {
                        title: '3.1',
                        content: 'Al onze aanbiedingen zijn steeds geheel vrijblijvend en gelden als een geheel.'
                    },
                    {
                        title: '3.2',
                        content: 'Wij kunnen onverwijld na de aanvaarding onze aanbieding herroepen ook al bevat onze aanbieding een termijn voor aanvaarding en geschiedt aanvaarding binnen deze termijn. Deze mogelijkheid hebben wij in ieder geval binnen twee werkdagen na ontvangst van de aanvaarding.'
                    },
                    {
                        title: '3.3',
                        content: 'Een overeenkomst geldt in ieder geval als te zijn tot stand gekomen indien door ons met de uitvoering van een opdracht is begonnen.'
                    },
                    {
                        title: '3.4',
                        content: 'De inhoud van onze prijslijsten, drukwerken, brochures en dergelijke zijn zo nauwkeurig mogelijk maar binden ons niet, tenzij in de overeenkomst daarnaar uitdrukkelijk wordt verwezen.'
                    }
                ]
            },
            {
                title: 'Artikel 4. Keuze',
                sections: [
                    {
                        title: '4.1',
                        content: 'Euro Bob is volledig vrij in de selectie van en de bemiddeling met de chauffeur.'
                    }
                ]
            },
            {
                title: 'Artikel 5. Offertes',
                sections: [
                    {
                        title: '5.1',
                        content: 'Offertes verplichten tot niets, mits deze een termijn voor aanvaarding bevatten.'
                    }
                ]
            },
            {
                title: 'Artikel 6. Duur van de opdracht',
                sections: [
                    {
                        title: '6.1',
                        content: 'De opdracht kan worden aangegaan voor bepaalde tijd of voor onbepaalde tijd.'
                    },
                    {
                        title: '6.2',
                        content: 'De opdracht voor bepaalde tijd wordt aangegaan: of ad hoc, of voor een vastgestelde tijd, óf voor een bepaalbare periode; dat wil zeggen voor een periode die eindigt, doordat zich een objectief bepaalbare gebeurtenis voordoet (een gebeurtenis die intreedt onafhankelijk van de wil van partijen), óf voor een bepaalbare periode, die een vastgestelde tijd niet overschrijdt. '
                    },
                    {
                        title: '6.3',
                        content: 'Bij de vastlegging van een bepaalbare periode, als bedoeld in lid 2 kunnen meerdere gebeurtenissen worden omschreven, met dien verstande dat door het intreden van elke afzonderlijke gebeurtenis de opdracht eindigt.'
                    }
                ]
            },
            {
                title: 'Artikel 7. Einde/ontbinding/opschorting van de opdracht',
                sections: [
                    {
                        title: '7.1',
                        content: 'De opdracht voor bepaalde tijd eindigt van rechtswege door het verstrijken van de vastgestelde tijd of doordat zich een gebeurtenis voordoet, als bedoelt in artikel 6 lid 2 en 3.'
                    },
                    {
                        title: '7.2',
                        content: 'Elke opdracht (voor bepaalde tijd of voor onbepaalde tijd) kan worden beëindigd door opzegging, indien (tussentijdse) opzegging is toegestaan. Dit laat onverlet de verplichting van de klant uitvoering te geven aan het hieronder bepaalde. '
                    },
                    {
                        title: '7.3',
                        content: 'Elke opdracht eindigt van rechtswege op het tijdstip dat wij de chauffeursdienst niet meer kunnen matchen voor de klant doordat de arbeidsovereenkomst tussen ons en de arbeidskracht is geëindigd en niet direct aansluitend wordt voortgezet. Dit einde treedt echter niet in, indien wij in staat zijn de arbeidskracht te vervangen door een andere arbeidskracht én vervanging daadwerkelijk plaatsvindt binnen twee weken na de datum waarop de arbeidskracht niet meer ter beschikking kon worden gesteld.'
                    },
                    {
                        title: '7.4',
                        content: 'Indien de klant één of meer van zijn verplichtingen voortvloeiende uit de overeenkomst niet, niet tijdig of niet behoorlijk nakomt, zijn wij gerechtigd om zonder nadere ingebrekestelling en rechterlijke tussenkomst en zonder gehouden te zijn tot enige schadevergoeding, de chauffeursdienst op te schorten en/of de desbetreffende overeenkomst door middel van een schriftelijke mededeling aan de klant met directe ingang te ontbinden, zulks onverminderd alle overige aan ons toekomende rechten, die alle terstond opeisbaar zijn geworden. '
                    },
                    {
                        title: '7.5',
                        content: 'Naast de overige aan ons toekomende rechten, kunnen wij de overeenkomst met de klant ten allen tijde zonder nadere ingebrekestelling en rechterlijke tussenkomst en zonder schadeplichtigheid jegens de klant door middel van een schriftelijke mededeling aan de klant met directe ingang ontbinden indien de klant zijn opeisbare verplichtingen onbetaald laat, insolvent wordt, indien het faillissement van of door de klant wordt aangevraagd, indien surséance van betaling wordt aangevraagd, of indien de klant zijn bedrijf staakt of overdraagt dan wel substantieel wijzigt en/of beslag onder hem wordt gelegd dat niet binnen 30 dagen na datum beslaglegging zal zijn opgeheven. Indien wij de overeenkomst met toepassing van dit artikel ontbinden, laat dit ons recht om volledige schadevergoeding inclusief alle kosten met inbegrip van de werkelijke kosten van rechtsbijstand te vorderen van de klant onverlet. '
                    },
                    {
                        title: '7.6',
                        content: 'De wederpartij heeft de gelegenheid een afgesproken rit ongedaan te maken, mits dit geschiedt uiterlijk 24 uur vóór aanvang van de rit. Indien niet tijdig wordt geannuleerd, is Euro Bob gerechtigd 3 werkuren bij de wederpartij te factureren. Dit is niet van toepassing bij het last-minute reserveren van een Euro Bob chauffeur. '
                    }
                ]
            },
            {
                title: 'Artikel 8. Rechtstreekse arbeidsverhouding',
                sections: [
                    {
                        title: '8.1',
                        content: 'Het is de klant niet toegestaan om gedurende de tijd dat enige arbeidskracht door ons is ingezet, dan wel binnen één jaar nadat de laatste opdracht is geëindigd direct of indirect arbeidskracht van ons al dan niet tegen betaling in dienst te nemen en/of te benaderen met het doel hen te bewegen met de klant of aan de klant gelieerde bedrijven een arbeidsovereenkomst aan te gaan, althans daarbij op enige wijze direct of indirect, om niet of om baat, betrokken te zijn, zulks op straffe van een per overtreding door de klant aan ons te betalen direct opeisbare en niet voor matiging vatbare boete van Euro 20.000,- alsmede een bedrag van Euro 450,- per dag of een gedeelte van een dag voor iedere dag dat deze overtreding voortduurt, onverminderd ons recht om volledige schadevergoeding te verlangen.'
                    }
                ]
            },
            {
                title: 'Artikel 9. Taak, werktijd',
                sections: [
                    {
                        title: '9.1',
                        content: 'Bij de opdracht verstrekt de klant aan ons de omschrijving van de taak die hij door een arbeidskracht ingevuld wenst te zien, de omschrijving van de taak is alleen noodzakelijk indien de klant de arbeidskracht langer dan 1 werkdag wenst en de te verwachten taken afwijken van chauffeursdiensten. De klant staat er jegens ons voor in dat de omschrijving overeenstemt met de werkelijk in te vullen taak. Indien op enig moment blijkt dat zulks niet het geval is, zal de klant aan ons onverwijld een passende omschrijving aanreiken. '
                    },
                    {
                        title: '9.2',
                        content: ' Indien en voor zover wij schade leiden doordat de bij opdracht verstrekte omschrijving niet overeenstemt met de werkelijk in te vullen taak of doordat de later (aangereikte) aangepaste omschrijving niet overeenstemt met de werkelijk ingevulde taak, is de klant gehouden die schade, inclusief kosten met inbegrip van de daadwerkelijke kosten van rechtsbijstand, volledig aan ons te vergoeden. '
                    },
                    {
                        title: '9.3',
                        content: 'Van overwerk is sprake indien werkzaamheden worden verricht boven de in de betreffende sector gebruikelijke arbeidsduur per dag of per week of bij regeling of rooster vastgesteld aantal uren. Overwerk aansluitend op de normale werktijd en niet langer durende dan een half uur wordt niet als zodanig aangemerkt. '
                    },
                    {
                        title: '9.4',
                        content: 'Indien en voor zover wij direct of indirect schade lijden doordat de bij opdracht bepaalde of later aangepaste werktijden, aantal arbeidsuren en rusttijden van de arbeidskracht afwijken van de voorwaarden of afwijken van de werkelijke tijden en uren die de arbeidskracht werkt of rust, is de klant gehouden die schade volledig aan ons te vergoeden. '
                    }
                ]
            },
            {
                title: 'Artikel 10. Prijzen en betaling ',
                sections: [
                    {
                        title: '10.1',
                        content: 'Onze aanbieding vermeldt het tarief. Wij zijn gerechtigd het tarief te verhogen met het volledige bedrag of het evenredige bedrag, voortvloeiende uit bijvoorbeeld één of meer van onderstaande kostenverhogingen ten aanzien van de opgedragen werkzaamheden, zoals verhoging van de uurbeloning van de arbeidskracht ten gevolge van een overheidsmaatregel of verbindend voorschrift, of ten gevolge van (de toepassing van) enige bepaling vervat in de opdracht en de bijbehorende voorwaarden; verhoging van de kosten verbonden aan de werkzaamheden ten gevolge van een overheidsmaatregel of verbindend voorschrift betreffende de arbeidsvoorwaarden van de arbeidskracht in algemene zin; verhoging van de kosten verbonden aan de werkzaamheden ten gevolge van wijziging van het werkgeversaandeel betreffende premies sociale verzekeringswetten of van overige door de ons te betalen premies en pensioenpremies (daaronder steeds begrepen verhoging van die premies op grond van verhoging van de gedekte risico\'s); verhoging van de kosten verbonden aan de werkzaamheden ten gevolge van wijziging in de sociale lasten en/of fiscale wetgeving of ten gevolge van de invoering van nieuwe lasten of premies op grond van de wet of enig verbindend voorschrift; verhoging van de kosten in de ruimste zin des woords verbonden aan de werkzaamheden voor de arbeidskracht. Indien door enige oorzaak toerekenbaar aan klant de ritbeloning/het tarief te laag is/zijn vastgesteld, zijn wij gerechtigd ook achteraf met terugwerkende kracht ritbeloning en tarief op het juiste niveau te brengen en aan de klant in rekening te brengen hetgeen de klant dientengevolge te weinig heeft betaald en is de klant gehouden het uit dien hoofde verschuldigde omgaand te voldoen'
                    },
                    {
                        title: '10.2',
                        content: 'Alle betalingen aan ons dienen zonder korting en verrekening prompt te geschieden of uiterlijk binnen 14 dagen na factuurdatum. (betaling per factuur kan alleen geschieden indien de klantgegevens voldoende bekend zijn en betaling redelijkerwijs verwacht kan worden) Deze betalingstermijn geldt als een fatale termijn. '
                    },
                    {
                        title: '10.3',
                        content: 'Indien wij één of meer vorderingen op de klant hebben die niet voortvloeien uit ten behoeve van de klant verrichte of te verrichten werkzaamheden, daaronder begrepen een vordering wegens tekortkoming van een zodanige overeenkomst, zal de betaling die van de klant wordt ontvangen eerst strekken tot betaling van die vorderingen. '
                    },
                    {
                        title: '10.4',
                        content: 'Onverminderd het bepaalde sub 10.3 strekken de door de klant gedane betalingen steeds ter betaling van alle verschuldigde rente en kosten en vervolgens van opeisbare facturen/vorderingen die het langst openstaan, zelfs al vermeldt de klant dat voldoening betrekking heeft op een andere of latere factuur/vordering. '
                    },
                    {
                        title: '10.5',
                        content: 'In geval de klant één of meer betalingsverplichtingen niet, niet tijdig of niet volledig nakomt, is de klant vanaf de vervaldatum aan ons een rente verschuldigd over alle te late betalingen ter hoogte van het percentage van de wettelijke rente vermeerderd met twee, per maand of gedeelte van een maand, waarbij een gedeelte van een maand geldt als volledige maand. Tevens is de klant alsdan de buitengerechtelijke en gerechtelijke incassokosten verschuldigd. Het bedrag van de buitengerechtelijke kosten bedraagt 10% van het bedrag van de achterstallige betaling met een minimum van 27,18 €, of zoveel meer als de werkelijke kosten bedragen. In geval van een procedure zal daarenboven terzake van gerechtelijke kosten het verschil tussen onze werkelijke kosten, van o.a. onze advocaat, en de door de rechterlijke instantie toegewezen kosten aan ons verschuldigd zijn, indien wij door de gerechtelijke instantie grotendeels in het gelijk worden gesteld.'
                    },
                    {
                        title: '10.6',
                        content: 'Wij zijn, ongeacht het bepaalde sub 10.2 gerechtigd om zonder opgaaf van redenen zekerheid, bijvoorbeeld middels overlegging van een naar onze mening deugdelijke bankgarantie, voor toekomstige betalingsverplichtingen van de klant te verlangen vóór (verdere) terbeschikkingstelling van arbeidskrachten. Mochten wij twijfelen aan de kredietwaardigheid van de klant, dan kunnen wij, zonder nadere motivering, opdrachten weigeren. '
                    }
                ]
            },
            {
                title: 'Artikel 11. Nota\'s op basis van tijd- en onkosten verantwoordingsformulier',
                sections: [
                    {
                        title: '11.1',
                        content: '(Alleen van toepassing indien de klant niet prompt betaalt). Onze nota\'s worden mede uitgeschreven aan de hand van de door de klant voor akkoord getekende tijd- en onkosten verantwoordingsformulieren (betreffende onder meer tijdsduur en ritafstand), ook wel genoemd ‘kwitanties’, welke de klant binden. Onder klant wordt in dit artikel verstaan iedere bij of voor de klant werkzame persoon. Wij zijn niet gehouden onderzoek te doen naar de bevoegdheid van degene die voor of namens de klant de formulieren ondertekend. Deze bevoegdheid wordt voorshands aangenomen. In het geval wij niemand aantreffen die voor of namens de klant de werkbrief(jes) kan ondertekenen, geldt het niet ondertekende kwitantie eveneens als uitgangspunt voor de nota(‘s). '
                    },
                    {
                        title: '11.2',
                        content: 'De klant is gehouden erop toe te zien of te doen toezien, dat de kwitanties volledig en juist worden ingevuld en gehouden de kwitantie voor akkoord te ondertekenen'
                    },
                    {
                        title: '11.3',
                        content: 'De klant dient eventuele reclamaties ten aanzien van de kwitanties aanstonds aan te tekenen op het betreffende kwitanties, dan wel binnen twee werkdagen na ondertekening van het betreffende formulier aan ons kenbaar te maken op straffe van verval van elk eventueel recht dienaangaande voor de klant. '
                    },
                    {
                        title: '11.4',
                        content: 'De kwitanties en daarop gebaseerde nota’s prevaleren boven eventueel door de klant opgestelde overzichten of andere stukken. '
                    }
                ]
            },
            {
                title: 'Artikel 12. Garantie veiligheid, vrijwaring en aansprakelijkheid',
                sections: [
                    {
                        title: '12.1',
                        content: 'Indien de arbeidskracht een bedrijfsongeval of een beroepsziekte overkomt, zal de klant de bevoegde instanties hiervan onverwijld op de hoogte stellen en ervoor zorg dragen dat daarvan onverwijld een rapport wordt opgemaakt, waarin de toedracht van het ongeval zodanig wordt vastgelegd, dat daaruit met een redelijke mate van zekerheid kan worden opgemaakt of en in hoeverre het ongeval het gevolg is van het feit dat onvoldoende maatregelen waren genomen ter voorkoming van een dergelijk bedrijfsongeval. De klant is steeds volledig aansprakelijk, onder meer jegens de sancties die door bevoegde instanties en/of rechterlijke instantie worden opgelegd en vrijwaart ons te dien zake.'
                    },
                    {
                        title: '12.2',
                        content: 'Voor schade veroorzaakt door geen, niet-tijdige, onvolledige of onbehoorlijke verrichting van chauffeurswerkzaamheden zijn wij alleen dan aansprakelijk in geval van opzet of grove schuld. '
                    },
                    {
                        title: '12.3',
                        content: 'De wederpartij vrijwaart ons voor aanspraken van derden, komende uit de door ons verrichte werkzaamheden. '
                    },
                    {
                        title: '12.4',
                        content: 'Wij aanvaarden, onverminderd de bepaling in lid 2, geen aansprakelijkheid voor: '
                    },
                    {
                        title: '12.5',
                        content: 'Het niet of niet-tijdig bereiken van de bestemming als gevolg van enigerlei vertraging;'
                    },
                    {
                        title: '12.6',
                        content: 'Schade of kosten gemaakt tijdens de uitvoering van de opdracht die ontstaan zijn door een bekeuring of een verkeersongeval, welke niet te wijten is aan opzet of grove schuld van de Euro Bob chauffeur; '
                    },
                    {
                        title: '12.7',
                        content: 'Schade aan het voertuig die is ontstaan tijdens de uitoefening van de werkzaamheden en / of de eventuele kosten van een bonus- of malusverlies; '
                    },
                    {
                        title: '12.8',
                        content: 'Letsel aan passagiers en schade of kosten ontstaan aan zaken aanwezig in het voertuig ten tijde van de uitvoering van de opdracht;'
                    },
                    {
                        title: '12.9',
                        content: 'Verlies of verlaging van no-claim korting en eigen risico’s van de verzekerde.'
                    }
                ]
            },
            {
                title: 'Artikel 13. Verzekeringen',
                sections: [
                    {
                        title: '13.1',
                        content: 'De wederpartij is verplicht ten minste een WA-verzekering af te sluiten conform de in de wet Aansprakelijkheidsverzekering Motorrijtuigen gestelde eisen, en is daarnaast verplicht te zorgen voor een inzittendenverzekering. De wederpartij is verplicht deze verzekeringen gedurende de gelding van de overeenkomst in stand te houden.'
                    }
                ]
            },
            {
                title: 'Artikel 14. Toepasselijk recht en geschillen ',
                sections: [
                    {
                        title: '14.1',
                        content: 'Op al onze overeenkomsten is uitsluitend Nederlands recht van toepassing.'
                    },
                    {
                        title: '14.2',
                        content: 'Indien een geschil volgens de wettelijke regels valt onder de bevoegdheid van een Arrondissementsrechtbank is uitsluitend de Arrondissementsrechtbank te ‘s-Gravenhage bevoegd, onverminderd ons recht het geschil voor te leggen aan de volgens de normale competentieregels bevoegde Arrondissementsrechtbank.'
                    }
                ]
            },
            {
                title: 'Artikel 15. Slotbepaling',
                sections: [
                    {
                        title: '15.1',
                        content: 'Mocht één der bepalingen van deze voorwaarden ongeldig zijn en/of worden nietig verklaard, dan wordt daardoor de geldigheid van de overige bepalingen niet aangetast. In plaats van het ongeldige en/of nietig verklaarde artikel lid wordt geacht alsdan een bepaling te zijn overeengekomen, die in het kader van hetgeen rechtens mogelijk is de bedoeling in de geest van het ongeldig en/of nietig verklaarde artikel lid het meest benadert.'
                    },
                    {
                        title: '15.2',
                        content: 'Wij kunnen deze voorwaarden in de toekomst te allen tijde wijzigen.'
                    },
                    {
                        title: '15.3',
                        content: ' Afwijkingen van deze algemene voorwaarden zijn slechts geldig indien zij schriftelijk vooraf worden overeengekomen.'
                    }
                ]
            }
        ];

        return terms.map((term) => {
            return (
                <View key={term.title}>
                    <View style={{marginBottom: 15, marginTop: 5}}>
                        <Text style={{fontSize: 14, color: '#263340'}}>{term.title}</Text>
                    </View>

                    {term.sections.map((section) => {
                        return (
                            <View key={section.title} style={{marginBottom: 15}}>
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <Text style={[{flex: 0.1}, styles.smallText]}>{section.title}</Text>
                                    <Text style={[{flex: 0.9, flexWrap: 'wrap'}, styles.smallText]}>{section.content}</Text>
                                </View>
                            </View>
                        );
                    })}
                </View>
            );
        });
    }

    render () {
        return (
            <ScrollView style={{padding: 15}}>
                <View>
                    {this.renderTerms()}
                </View>
            </ScrollView>
        );
    }
}

Terms.propTypes = {
};

export default Terms;
