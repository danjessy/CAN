using System;
using System.IO;
using System.Text.Json;
using System.Collections.Generic;

// Étape 1 du sujet 

class Reservations
{
    string nom;
    string laision;
    string date;
    string heure;
    string horodatage;


}

class DonneesReservation
{
     public Reservation reservation {get; set; }
     public List<Passager> passagers {get; set; }
     public List<Vehicule> vehicules { get; set; }

}
class Passager                     
{                                  
    public string nom;             
    public string prenom;          
    public string codeCategorie;   
}                                  

class Vehicule                     
{                                  
    public string codeCategorie;   
    public int quantite;          
}                                 

class Program
{
    static void Main()
    {
        // ÉTAPE 1 : Lire le JSON existant 
        
        string text = File.ReadAllText("StructureJson.json");

        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };

        List<DonneesReservation> liste =
        JsonSerializer.Deserialize<liste<DonneesReservation>>(text, options);

        var donnees = liste[0];

        // Étape 2 Afficher les informations 

        Console.WriteLine("=== Récapitulatif ===");
        Console.WriteLine($"Nom : {donnees.reservation.nom}");
        Console.WriteLine($"Liaison : {donnees.reservation.idLiaison}");
        Console.WriteLine($"Date : {donnees.reservation.date}");
        Console.WriteLine($"Horodatage : {donnees.reservation.horodatage}");

        Console.WriteLine("\nPassagers :");
        foreach (var p in donnees.reservation)
        {
            Console.WriteLine($"{p.prenom} {p.nom} - {p.codeCategorie}");
        }
        
        Console.WriteLine("\nVéhicules :");
        foreach ( var v in donnees.vehicules)
        {
            Console.WriteLine($"{v.codeCategorie} x{v.quantite}");
        }
    }
}


