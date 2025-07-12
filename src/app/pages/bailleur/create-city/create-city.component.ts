import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ContactComponent } from '../../../Component/website/contact/contact.component';
import { CiteService } from '../../../services/cite/cite.service';

@Component({
  selector: 'app-create-city',
  standalone: true,
  imports: [ FormsModule, ContactComponent, RouterLink ],
  templateUrl: './create-city.component.html',
  styleUrl: './create-city.component.scss'
})
export class CreateCityComponent {
  step: number = 1;
  totalSteps: number = 5;
  cityData: any = {
    nom: '',
    localisation: '',
    description: '',
    photo: null,
    caracteristiques: {
      etages: 0,
      chambres: 0,
      tailleParChambre: 0,
      prix: 0,
      dureeBail: 0,
      caution: 0,
      banque: '',
      numeroCompte: '',
      eau: 'Gratuite',
      electricite: 'Gratuite',
      groupeElectrogene: false,
      forage: false,
      gardien: false,
      concierge: false,
      barriere: false,
      couvreFeu: false,
    },
    supplements: {
      restaurant: false,
      salleDeJeux: false,
      salleDeFetes: false,
      boutique: false,
      salonDeCoiffure: false
    },
    contacts: [],
    images: [],
    documents: []
  };

  photoPreview: any; // Pour l'aperçu

  newContact:any = {
    name: '',
    email: '',
    phone: ''
  };

  sections: any = {
    caracteristiques: true,
    caracteristiquesFinancieres: true,
    supplements: true,
    contacts: true,
    documents: true,
    images: true
  }

  // Types autorisés
  private allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
  private allowedVideoTypes = ['video/mp4', 'video/quicktime'];
  // Fichiers médias temporaires
  temporaryMedia: any[] = [];
  mediaUploadError: string | null = null;

  isAddContactFormOpened: boolean = false;
  isDocumentFormOpened: boolean = false;
  isVideoFormOpened: boolean = false;
  isBlackBackgroundVisible: boolean = false;
  isLoading: boolean = false;
  isRegisterSucceed : boolean = false;
  isRegisterFailed: boolean = false;

  constructor(private router: Router, private citeService: CiteService){

  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.processImage(file);
    }
  }

  onFileDropped(event: DragEvent): void {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.processImage(files[0]);
    }
  }

  private processImage(file: File): void {
    // Vérification du type de fichier
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      alert('Seuls les fichiers JPEG, PNG et GIF sont autorisés');
      return;
    }

    // Mise à jour de l'objet
    this.cityData.photo = file;

    // Création de l'aperçu
    const reader = new FileReader();
    reader.onload = () => {
      this.photoPreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  dragOver(event: DragEvent): void {
    event.preventDefault();
    const element = event.target as HTMLElement;
    element.classList.add('drag-active');
    
    // Retirer la classe après un court délai
    setTimeout(() => {
      element.classList.remove('drag-active');
    }, 100);
  }

  onDocumentsSelected(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.processDocuments(files);
    }
  }

  onDocumentsDropped(event: DragEvent): void {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.processDocuments(files);
    }
  }

  private processDocuments(files: FileList): void {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      if (!allowedTypes.includes(file.type)) {
        alert('Seuls les fichiers PDF et Word sont autorisés');
        continue;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.cityData.documents.push({
          name: file.name,
          type: file.type,
          size: file.size,
          content: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  }

  removeDocument(index: number): void {
    this.cityData.documents.splice(index, 1);
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Gestion de la sélection de fichiers média
  onMediaSelected(event: any): void {
    this.mediaUploadError = null;
    const files = event.target.files;
    if (files && files.length > 0) {
      this.prepareMedia(files);
    }
  }

  // Gestion du drop de fichiers média
  onMediaDropped(event: DragEvent): void {
    event.preventDefault();
    this.mediaUploadError = null;
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.prepareMedia(files);
    }
  }

  // Préparation des médias avant ajout
  private prepareMedia(files: FileList): void {
    const maxSize = 20 * 1024 * 1024; // 20MB
    this.temporaryMedia = []; // Réinitialiser
    this.mediaUploadError = null;

    // Utilisation d'une fonction fléchée pour préserver le contexte de 'this'
    const processFile = (file: File) => {
      const isImage = this.allowedImageTypes.includes(file.type);
      const isVideo = this.allowedVideoTypes.includes(file.type);

      // Validation du type
      if (!isImage && !isVideo) {
        this.mediaUploadError = 'Seuls les fichiers image (JPEG, PNG, GIF) et vidéo (MP4, MOV) sont autorisés';
        return;
      }

      // Validation de la taille
      if (file.size > maxSize) {
        this.mediaUploadError = `Le fichier ${file.name} dépasse la taille maximale de 20MB`;
        return;
      }

      // Créer l'objet média temporaire
      const mediaObj = {
        file: file,
        name: file.name,
        type: file.type,
        size: file.size,
        isImage: isImage,
        isVideo: isVideo,
        preview: null as string | null
      };

      // Générer l'aperçu
      if (isImage) {
        const reader = new FileReader();
        
        // Fonction fléchée pour préserver le contexte
        reader.onload = (e) => {
          if (e.target?.result) {
            mediaObj.preview = e.target.result as string;
            // Vérifier que le média n'est pas déjà présent
            if (!this.temporaryMedia.some(m => m.name === mediaObj.name)) {
              this.temporaryMedia = [...this.temporaryMedia, mediaObj];
            }
          }
        };
        
        reader.onerror = () => {
          console.error('Erreur lors de la lecture du fichier', file.name);
        };
        
        reader.readAsDataURL(file);
      } else {
        // Pour les vidéos
        mediaObj.preview = 'assets/video-icon.svg';
        this.temporaryMedia = [...this.temporaryMedia, mediaObj];
      }
    };

    // Traiter chaque fichier
    Array.from(files).forEach(processFile);
  }

  // Ajouter les médias sélectionnés
  addMedia(): void {
    if (this.temporaryMedia.length === 0) {
      this.mediaUploadError = 'Aucun média valide à ajouter';
      return;
    }

    this.temporaryMedia.forEach(media => {
      const reader = new FileReader();
      reader.onload = () => {
        this.cityData.images.push({
          name: media.name,
          type: media.type,
          size: media.size,
          isImage: media.isImage,
          isVideo: media.isVideo,
          content: reader.result,
          uploadedAt: new Date()
        });
      };
      
      if (media.isImage) {
        reader.readAsDataURL(media.file);
      } else {
        // Pour les vidéos, on pourrait utiliser une autre méthode si nécessaire
        this.cityData.images.push({
          name: media.name,
          type: media.type,
          size: media.size,
          isImage: false,
          isVideo: true,
          content: null, // On pourrait stocker une URL ou autre référence
          file: media.file, // Stocker le fichier directement pour traitement ultérieur
          uploadedAt: new Date()
        });
      }
    });

    // Réinitialiser après ajout
    this.temporaryMedia = [];
    this.mediaUploadError = null;
  }

  // Supprimer un média
  removeMedia(index: number): void {
    this.cityData.images.splice(index, 1);
  }

  // Supprimer un média temporaire
  removeTemporaryMedia(index: number): void {
    this.temporaryMedia.splice(index, 1);
  }

  // Prochaine étape
  nextStep(): void {
    // Vérifie si nous pouvons passer à l'étape suivante
    if (this.shouldProceedToNextStep()) {
      this.step += 1;
    }
  }

  private shouldProceedToNextStep(): boolean {
    // Vérifie les limites des étapes
    if (this.step < 1 || this.step >= this.totalSteps) {
      console.warn('Navigation invalide entre les étapes', {
        currentStep: this.step,
        totalSteps: this.totalSteps
      });
      return false;
    }

    // Vérifie la validité des formulaires selon l'étape actuelle
    switch (this.step) {
      case 1:
        return this.isFormOneValid();
      case 2:
        return this.isFormTwoValid();
      case 4:
        return this.isFormFourValid();
      default:
        // Pour les étapes sans validation spécifique
        return true;
    }
  }

  // Vérifie si la 1ère section est valide
  isFormOneValid(): boolean {
    if(this.cityData.nom === '' || this.cityData.localisation === '' || this.cityData.description === '' || this.cityData.photo === null)
      return false;
    return true;
  }

  // Vérifie si la 2e section est valide
  isFormTwoValid(): boolean {
    let c = this.cityData.caracteristiques;
    if(c.banque == '' || c.numeroCompte == '' || c.eau == '' || c.electricite == '')
      return false;
    return true;
  }

  // Vérifie si la 3e section est valide
  isFormFourValid(): boolean{
    if(this.cityData.contacts.length == 0 || this.cityData.documents.length == 0)
      return false;
    return true;
  }

  // Retour en arrière
  back(){
    if(this.step == 1)
      this.router.navigate(['/website/become-bailleur']);
    else if(this.step > 1 && this.step <= this.totalSteps){
      this.step -= 1;
    }
  }

  toggleData(key: keyof typeof this.cityData.caracteristiques) {
    this.cityData.caracteristiques[key] = !this.cityData.caracteristiques[key];
  }

  toggleDataSupplement(key: keyof typeof this.cityData.supplements) {
    this.cityData.supplements[key] = !this.cityData.supplements[key];
  }
  

  removeContactByEmail(email: string): void {
    const index = this.cityData.contacts.findIndex((contact: any) => contact.email === email);
    if (index !== -1) {
      this.cityData.contacts.splice(index, 1);
    }
  }

  // Ajouter un contact
  addContact(){
    this.cityData.contacts.push(this.newContact);
    this.closeAll();
  }

  addMedias(){
    this.temporaryMedia.forEach(elt => {
      this.cityData.images.push(elt);
    })
    this.closeAll();
  }
  
  // Ajouter un document
  addDocument(){
    this.closeAll();
    console.log(this.cityData);
  }

  // Fermer toutes les fenêtres
  closeAll(){
    this.isAddContactFormOpened = false;
    this.isDocumentFormOpened = false;
    this.isVideoFormOpened = false;
    this.isBlackBackgroundVisible = false;
  }
  

  toggleSection(key: string){
    this.sections[key] = !this.sections[key];
  }

  transformCityDataToCite(cityData: any): any {
    const cite = {
      name: cityData.nom || "",
      description: cityData.description || "",
      localisation: {
        quartier: cityData.localisation || "",
        ville: "", // À compléter manuellement ou depuis une autre source
        latitude: 0, // À compléter si dispo
        longitude: 0 // À compléter si dispo
      },
      contactList: cityData.contacts?.map((contact: any) => ({
        name: contact.name,
        phone: contact.phone,
        email: contact.email
      })) || [],
      caracteristiques: Object.entries(cityData.caracteristiques || {}).map(([key, value]) => {
        return {
          name: key,
          value: typeof value === 'boolean' ? (value ? "oui" : "non") : value,
          description: "" // Tu peux ajouter une description personnalisée ici si besoin
        };
      }),
      suplementList: Object.entries(cityData.supplements || {}).map(([key, value]) => ({
        name: key,
        is_present: value
      })),
      picturePaths: (cityData.images || []).map((img: any) => ({
        filesrc: img.file.preview || ""
      }))
    };

    return cite;
  }



  // Ajouter la cité
  saveCity(){
    let cite = this.transformCityDataToCite(this.cityData);
    console.log(cite);
    this.isLoading = true;
    this.citeService.addCite(cite).subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = false;
        if(res.success = true){
          this.isRegisterSucceed = true;
        }else{
          this.isRegisterFailed = true;
        }
      }, error: (err) => {
        this.isLoading = false;
        console.error("Erreur lors de l'ajout d'une cité", err);
      }
    })
  }
}

