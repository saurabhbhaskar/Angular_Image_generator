import { TestBed } from '@angular/core/testing';

import { TextToImageService } from './text-to-image.service';

describe('TextToImageService', () => {
  let service: TextToImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextToImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
