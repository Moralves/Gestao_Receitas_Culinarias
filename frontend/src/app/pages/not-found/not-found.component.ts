import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Fallback page for unknown routes.
 */
@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {}
