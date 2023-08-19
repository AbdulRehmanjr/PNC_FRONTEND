import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../variables/environment';
import { Sellerrequest } from '../class/sellerrequest';

@Injectable({
  providedIn: 'root',
})
export class SellerrequestService {
  private url: string = `${environment.baseUrl}/${environment.sellerrequest}`;

  constructor(private http: HttpClient) {}

  /**
   * The function creates a request by sending seller information, a picture, and a document to a
   * server using HTTP POST.
   * @param {Sellerrequest} sellerInfo - An object containing information about the seller's request.
   * This could include details such as the seller's name, contact information, product details, etc.
   * @param {File} picture - The "picture" parameter is a File object that represents an image file. It
   * is used to upload a picture associated with the seller request.
   * @param {File} document - The `document` parameter is a File object that represents a document
   * file. It could be a PDF, Word document, or any other type of document file.
   * @returns an HTTP POST request to the specified URL with the form data containing the seller
   * information, picture file, and document file. The response from the server is being observed and
   * returned.
   */
  createRequest(sellerInfo: Sellerrequest, picture: File, document: File) {
    let formData = new FormData();
    formData.append('request', JSON.stringify(sellerInfo));
    formData.append('document', document);
    formData.append('picture', picture);

    return this.http.post(`${this.url}/create`, formData, { observe: 'body' });
  }

  /**
   * The function `getAllRequests()` sends an HTTP GET request to retrieve all requests from a
   * specified URL.
   * @returns The getAllRequests() function is returning an HTTP GET request to the specified URL with
   * the option to observe the response body.
   */
  getAllRequests() {
    return this.http.get(`${this.url}/all`, { observe: 'body' });
  }

  /**
   * The function `getRequestsCounting()` sends an HTTP GET request to the specified URL and returns the
   * response body.
   * @returns an HTTP GET request to the specified URL with the option to observe the response body.
   */
  getRequestsCounting() {
    return this.http.get(`${this.url}/pending`, { observe: 'body' });
  }

  /**
   * The function `getRequestByUserId` sends an HTTP GET request to retrieve user data based on the
   * provided user ID.
   * @param {string} id - The `id` parameter is a string that represents the user ID. It is used to
   * specify which user's request should be retrieved.
   * @returns an HTTP GET request to the specified URL with the user ID as a parameter. The response
   * from the request is being observed and returned.
   */
  getRequestByUserId(id: string) {
    return this.http.get(`${this.url}/user/${id}`, { observe: 'body' });
  }

  /**
   * The function `getRequestCheck` sends an HTTP GET request to the specified URL with the provided ID
   * and returns the response body as text.
   * @param {string} id - The `id` parameter is a string that represents the identifier of the
   * requested check.
   * @returns an HTTP GET request to the specified URL with the provided ID. The response is being
   * observed as the body and the response type is set to text.
   */
  getRequestCheck(id: string) {
    return this.http.get(`${this.url}/check-requested/${id}`, {
      observe: 'body',
      responseType: 'text',
    });
  }

  /**
   * The `rejectRequest` function sends a POST request to the server to reject a request with a
   * specified message and request ID.
   * @param {string} message - The `message` parameter is a string that represents the rejection
   * message for the request.
   * @param {number} requestId - The `requestId` parameter is a number that represents the unique
   * identifier of the request that needs to be rejected.
   * @returns The HTTP post request is being returned.
   */
  rejectRequest(message: string, requestId: number) {
    return this.http.post(`${this.url}/reject/${requestId}`, message, {
      observe: 'body',
    });
  }

  /**
   * The acceptRequest function sends a POST request to the specified URL with the requestId as a
   * parameter.
   * @param {number} requestId - The `requestId` parameter is a number that represents the unique
   * identifier of the request that needs to be accepted.
   * @returns The `acceptRequest` function is returning an HTTP POST request to the specified URL with
   * the request ID as a parameter. The request is being observed for the response body.
   */
  acceptRequest(requestId: number) {
    return this.http.post(
      `${this.url}/accept/${requestId}`,
      {},
      { observe: 'body',responseType: 'json' }
    );
  }
}
