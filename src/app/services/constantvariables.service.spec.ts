import { TestBed, inject } from '@angular/core/testing';

import { ConstantvariablesService } from './constantvariables.service';

describe('ConstantvariablesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConstantvariablesService]
    });
  });

  it('should be created', inject([ConstantvariablesService], (service: ConstantvariablesService) => {
    expect(service).toBeTruthy();
  }));
});
