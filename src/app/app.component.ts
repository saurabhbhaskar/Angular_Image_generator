import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { TextToImageService } from './services/text-to-image.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Image Generator';
  imageurl!: SafeUrl;

  private textService = inject(TextToImageService);
  private sanitizer = inject(DomSanitizer);

  onSubmit(form: NgForm) {
    let formData = new FormData();
    formData.append('prompt', form.value.text);

    console.log('Your form data: ', form.value.text);
    this.textService.textToImage(formData).subscribe({
      next: (res) => {
        const TYPED_ARRAY = new Uint8Array(res);

        const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
          return data + String.fromCharCode(byte);
        }, '');

        const base64String = btoa(STRING_CHAR);

        this.imageurl = this.sanitizer.bypassSecurityTrustUrl(
          'data:image/png;base64,' + base64String
        );
        console.log(this.imageurl);
      },
      error: (error) => {
        console.error('Error generating image:', error);
        if (error.status === 402) {
          alert('Payment required or quota exceeded. Please check your API plan.');
        } else {
          const errorMessage = error.message || 'An unknown error occurred';
          alert(errorMessage);
        }
      },
    });
  }
}
