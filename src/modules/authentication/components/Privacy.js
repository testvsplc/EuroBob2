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

class Privacy extends Component {
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
                title: 'Persoonsgegevens die wij verwerken',
                sections: [
                    {
                        title: '',
                        content: 'Euro BOB Chauffeursdiensten verwerkt persoonsgegevens over u doordat u gebruik maakt van onze diensten en/of omdat u deze zelf aan ons verstrekt. Hieronder een overzicht van de persoonsgegevens die wij verwerken:'
                    },
                    {
                        title: '',
                        content: '- Voor- en achternaam'
                    },
                    {
                        title: '',
                        content: '- Adresgegevens'
                    },
                    {
                        title: '',
                        content: '- Telefoonnummer'
                    },
                    {
                        title: '',
                        content: '- Overige persoonsgegevens die je actief verstrekt bijvoorbeeld door een profiel op deze website aan te maken, in correspondentie en telefonisch'
                    },
                    {
                        title: '',
                        content: '- Locatiegegevens'
                    },
                    {
                        title: '',
                        content: '- Gegevens over uw activiteiten op onze website'
                    },
                    {
                        title: '',
                        content: '- Gegevens over uw surfgedrag over verschillende websites heen (bijvoorbeeld omdat dit bedrijf onderdeel is van een advertentienetwerk)'
                    },
                    {
                        title: '',
                        content: '- Lijst met contactgegevens van de klant via een app'
                    },
                    {
                        title: '',
                        content: '- Internetbrowser en apparaat type'
                    }
                ]
            },
            {
                title: 'Bijzondere en/of gevoelige persoonsgegevens die wij verwerken',
                sections: [
                    {
                        title: '',
                        content: 'Onze website en/of dienst heeft niet de intentie gegevens te verzamelen over websitebezoekers die jonger zijn dan 16 jaar. Tenzij ze toestemming hebben van ouders of voogd. We kunnen echter niet controleren of een bezoeker ouder dan 16 is. Wij raden ouders dan ook aan betrokken te zijn bij de online activiteiten van hun kinderen, om zo te voorkomen dat er gegevens over kinderen verzameld worden zonder ouderlijke toestemming. Als je er van overtuigd bent dat wij zonder die toestemming persoonlijke gegevens hebben verzameld over een minderjarige, neem dan contact met ons op via info@eurobob.nl, dan zullen wij deze informatie verwijderen'
                    }
                ]
            },
            {
                title: 'Waarom we gegevens nodig hebben',
                sections: [
                    {
                        title: '',
                        content: 'Euro BOB Chauffeursdiensten verwerkt uw persoonsgegevens, voor de volgende doelen:'
                    },
                    {
                        title: '',
                        content: '- Het afhandelen van uw betaling'
                    },
                    {
                        title: '',
                        content: '- Verzenden van onze nieuwsbrief en/of reclamefolder'
                    },
                    {
                        title: '',
                        content: '- U te kunnen bellen indien dit nodig is om onze dienstverlening uit te kunnen voeren'
                    },
                    {
                        title: '',
                        content: '- U te informeren over wijzigingen van onze diensten en producten'
                    },
                    {
                        title: '',
                        content: '- U de mogelijkheid te bieden een account aan te maken'
                    },
                    {
                        title: '',
                        content: '- Om goederen en diensten bij u af te leveren'
                    },
                    {
                        title: '',
                        content: '- Euro BOB Chauffeursdiensten analyseert jouw gedrag op de website om daarmee onze website te verbeteren en ons aanbod van producten en diensten af te stemmen op uw voorkeuren.'
                    },
                    {
                        title: '',
                        content: '- Euro BOB Chauffeursdiensten volgt uw surfgedrag over verschillende websites waarmee wij onze producten en diensten afstemmen op uw behoefte.'
                    },
                    {
                        title: '',
                        content: '- Euro BOB Chauffeursdiensten verwerkt ook persoonsgegevens als wij hier wettelijk toe verplicht zijn, zoals bijvoorbeeld gegevens die wij nodig hebben voor onze belastingaangifte.'
                    }
                ]
            },
            {
                title: 'Hoe lang we gegevens bewaren',
                sections: [
                    {
                        title: '',
                        content: 'Euro BOB Chauffeursdiensten zal uw persoonsgegevens niet langer bewaren dan strikt nodig is om de doelen te realiseren waarvoor uw gegevens worden verzameld. Onze bewaartermijn(en) zijn: ...'
                    }
                ]
            },
            {
                title: 'Delen met anderen',
                sections: [
                    {
                        title: '',
                        content: 'Euro BOB Chauffeursdiensten verkoopt uw gegevens niet aan derden en zal deze uitsluitend verstrekken indien dit nodig is voor de uitvoering van onze overeenkomst met u of om te voldoen aan een wettelijke verplichting. Met bedrijven die uw gegevens verwerken in onze opdracht, sluiten wij een bewerkersovereenkomst om te zorgen voor eenzelfde niveau van beveiliging en vertrouwelijkheid van uw gegevens. Euro BOB Chauffeursdiensten blijft verantwoordelijk voor deze verwerkingen.'
                    }
                ]
            },
            {
                title: 'In kaart brengen websitebezoek',
                sections: [
                    {
                        title: '',
                        content: 'Euro BOB Chauffeursdiensten gebruikt alleen technische en functionele cookies. En analytische cookies die geen inbreuk maken op uw privacy. Een cookie is een klein tekstbestand dat bij het eerste bezoek aan deze website wordt opgeslagen op uw computer, tablet of smartphone. De cookies die wij gebruiken zijn noodzakelijk voor de technische werking van de website en uw gebruiksgemak. Ze zorgen ervoor dat de website naar behoren werkt en onthouden bijvoorbeeld uw voorkeursinstellingen. Ook kunnen wij hiermee onze website optimaliseren. U kunt zich afmelden voor cookies door uw internetbrowser zo in te stellen dat deze geen cookies meer opslaat. Daarnaast kunt u ook alle informatie die eerder is opgeslagen via de instellingen van uw browser verwijderen.'
                    }
                ]
            },
            {
                title: 'Gegevens inzien, aanpassen of verwijderen',
                sections: [
                    {
                        title: '',
                        content: 'U heeft het recht om uw persoonsgegevens in te zien, te corrigeren of te verwijderen. U kunt een verzoek tot inzage, correctie of verwijdering sturen naar info@eurobob.nl. Om er zeker van te zijn dat het verzoek tot inzage door u is gedaan, vragen wij u een kopie van uw identiteitsbewijs bij het verzoek mee te sturen. Hierbij vragen we u om in deze kopie uw pasfoto en burgerservicenummer (BSN) zwart te maken. Dit ter bescherming van uw privacy. Euro BOB Chauffeursdiensten zal zo snel mogelijk, maar binnen vier weken, op uw verzoek reageren.'
                    }
                ]
            },
            {
                title: 'Beveiliging',
                sections: [
                    {
                        title: '',
                        content: 'Euro BOB Chauffeursdiensten neemt de bescherming van uw gegevens serieus en neemt passende maatregelen om misbruik, verlies, onbevoegde toegang, ongewenste openbaarmaking en ongeoorloofde wijziging tegen te gaan. Als u de indruk heeft dat uw gegevens niet goed beveiligd zijn of er aanwijzingen zijn van misbruik, neem dan contact op met onze klantenservice of via info@eurobob.nl'
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

                    {term.sections.map((section, key) => {
                        return (
                            <View key={`${section.title}_${key}`} style={{marginBottom: 15}}>
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

Privacy.propTypes = {
};

export default Privacy;
