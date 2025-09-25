import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <Header/>
        <div className="container mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contactez-nous
          </h1>
          <p className="text-xl text-gray-600">
            Nous sommes là pour répondre à toutes vos questions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Envoyez-nous un message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input id="firstName" placeholder="Votre prénom" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Nom</Label>
                    <Input id="lastName" placeholder="Votre nom" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="votre@email.com" />
                </div>

                <div>
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" placeholder="+225 07 12 34 56 78" />
                </div>

                <div>
                  <Label htmlFor="subject">Sujet</Label>
                  <Input id="subject" placeholder="Objet de votre message" />
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Décrivez votre demande..." 
                    rows={6}
                  />
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Envoyer le message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Nos coordonnées</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Adresse</h3>
                    <p className="text-gray-600">
                      Cocody, Riviera 3<br />
                      Abidjan, Côte d'Ivoire
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Téléphone</h3>
                    <p className="text-gray-600">+225 07 12 34 56 78</p>
                    <p className="text-gray-600">+225 05 87 65 43 21</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">contact@gad-entreprise.com</p>
                    <p className="text-gray-600">info@gad-entreprise.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Horaires</h3>
                    <p className="text-gray-600">Lun - Ven: 8h00 - 18h00</p>
                    <p className="text-gray-600">Sam: 8h00 - 16h00</p>
                    <p className="text-gray-600">Dim: Fermé</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Besoin d'aide ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Notre équipe d'experts est disponible pour vous conseiller 
                  sur nos produits et vous aider à trouver la solution adaptée 
                  à vos besoins.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>📞 <strong>Consultation téléphonique :</strong> Gratuite</p>
                  <p>🚚 <strong>Livraison :</strong> Partout en Côte d'Ivoire</p>
                  <p>💳 <strong>Paiement :</strong> À la livraison</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        </div>
      {/* Footer */}
      <Footer/>
    </>
  );
}