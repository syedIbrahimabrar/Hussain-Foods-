import { useState, useEffect, FormEvent } from 'react';
import { Star, Quote, ThumbsUp, Plus, CheckCircle2, Search, Sparkles, MessageSquare, X } from 'lucide-react';
import { Review } from '../types';
import { REVIEWS_DATA, RESTAURANT_INFO } from '../data/menuData';

export function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('hf_user_reviews');
      if (saved) {
        const parsed = JSON.parse(saved);
        return [...parsed, ...REVIEWS_DATA];
      }
    } catch {
      // fallback
    }
    return REVIEWS_DATA;
  });

  const [activeFilter, setActiveFilter] = useState<'ALL' | '5_STAR' | '4_STAR' | 'VERIFIED'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [submittedNotice, setSubmittedNotice] = useState(false);

  // Form State
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newDishName, setNewDishName] = useState('');
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    try {
      // Save user-submitted ones (exclude base REVIEWS_DATA IDs)
      const userSubmitted = reviews.filter((r) => !r.id.startsWith('rev-'));
      localStorage.setItem('hf_user_reviews', JSON.stringify(userSubmitted));
    } catch (e) {
      console.error('Failed to save user reviews to localStorage', e);
    }
  }, [reviews]);

  const handleLikeReview = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          return { ...r, likes: (r.likes || 0) + 1 };
        }
        return r;
      })
    );
  };

  const handleAddReview = (e: FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const newRev: Review = {
      id: `user-rev-${Date.now()}`,
      author: newAuthor.trim(),
      rating: newRating,
      comment: newComment.trim(),
      date: 'Just now',
      dishName: newDishName.trim() || 'Hussain Foods Special',
      verified: true,
      likes: 1,
    };

    setReviews([newRev, ...reviews]);
    setNewAuthor('');
    setNewDishName('');
    setNewComment('');
    setNewRating(5);
    setIsWriteModalOpen(false);
    setSubmittedNotice(true);
    setTimeout(() => setSubmittedNotice(false), 5000);
  };

  // Filter reviews
  const filteredReviews = reviews.filter((r) => {
    if (activeFilter === '5_STAR' && r.rating !== 5) return false;
    if (activeFilter === '4_STAR' && r.rating !== 4) return false;
    if (activeFilter === 'VERIFIED' && !r.verified) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchAuthor = r.author.toLowerCase().includes(q);
      const matchComment = r.comment.toLowerCase().includes(q);
      const matchDish = (r.dishName || '').toLowerCase().includes(q);
      return matchAuthor || matchComment || matchDish;
    }
    return true;
  });

  // Calculate stats
  const totalCount = reviews.length;
  const avgRating = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / totalCount
  ).toFixed(1);
  const count5Star = reviews.filter((r) => r.rating === 5).length;
  const count4Star = reviews.filter((r) => r.rating === 4).length;

  return (
    <section id="reviews" className="py-24 bg-gradient-to-b from-black via-zinc-950 to-black border-t border-zinc-900 relative overflow-hidden">
      {/* Background Decorative Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 bg-zinc-900/80 border border-[#D4AF37]/30 text-[#D4AF37] text-xs uppercase tracking-widest font-semibold px-3.5 py-1.5 rounded-full mb-3 backdrop-blur-md">
            <ThumbsUp className="w-4 h-4 text-[#D4AF37]" />
            <span>Customer Testimonials & Ratings</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white mb-4">
            What Our <span className="text-gold-gradient">Guests Say</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Authentic, unedited feedback from Karachi food lovers, family diners, and delivery customers.
          </p>
        </div>

        {/* Success Notice Toast */}
        {submittedNotice && (
          <div className="max-w-md mx-auto mb-8 bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 text-xs sm:text-sm p-4 rounded-2xl text-center flex items-center justify-center space-x-2 animate-in fade-in duration-300">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span>Thank you! Your review has been published successfully. 🎉</span>
          </div>
        )}

        {/* Rating Summary & Action Header Box */}
        <div className="bg-[#121212]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 mb-12 shadow-2xl backdrop-blur-md grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Left: Score */}
          <div className="text-center md:text-left border-b md:border-b-0 md:border-r border-zinc-800 pb-6 md:pb-0 md:pr-6">
            <div className="flex items-baseline justify-center md:justify-start space-x-2">
              <span className="font-serif text-5xl sm:text-6xl font-extrabold text-gold-gradient">
                {avgRating}
              </span>
              <span className="text-zinc-500 font-bold text-lg">/ 5.0</span>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-1 my-2 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-xs text-zinc-400">
              Based on <strong>{RESTAURANT_INFO.reviewsCount}</strong> verified customer reviews in Buffer Zone, Karachi.
            </p>
          </div>

          {/* Middle: Rating Distribution Bars */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center space-x-2">
              <span className="w-12 text-zinc-400 font-semibold">5 Stars</span>
              <div className="flex-1 bg-zinc-900 rounded-full h-2.5 overflow-hidden border border-zinc-800">
                <div
                  className="bg-gold-gradient h-full rounded-full"
                  style={{ width: `${Math.round((count5Star / totalCount) * 100)}%` }}
                />
              </div>
              <span className="w-8 text-right text-zinc-400">{count5Star}</span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="w-12 text-zinc-400 font-semibold">4 Stars</span>
              <div className="flex-1 bg-zinc-900 rounded-full h-2.5 overflow-hidden border border-zinc-800">
                <div
                  className="bg-amber-500 h-full rounded-full"
                  style={{ width: `${Math.round((count4Star / totalCount) * 100)}%` }}
                />
              </div>
              <span className="w-8 text-right text-zinc-400">{count4Star}</span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="w-12 text-zinc-400 font-semibold">3 Stars</span>
              <div className="flex-1 bg-zinc-900 rounded-full h-2.5 overflow-hidden border border-zinc-800">
                <div className="bg-zinc-700 h-full rounded-full" style={{ width: '0%' }} />
              </div>
              <span className="w-8 text-right text-zinc-400">0</span>
            </div>
          </div>

          {/* Right: CTA Write a Review */}
          <div className="text-center md:text-right flex flex-col items-center md:items-end justify-center space-y-3">
            <button
              onClick={() => setIsWriteModalOpen(true)}
              id="write-review-btn"
              className="w-full sm:w-auto bg-gold-gradient hover:bg-gold-gradient-hover text-black font-bold px-6 py-3.5 rounded-full text-xs sm:text-sm flex items-center justify-center space-x-2 transition shadow-xl cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Write a Review & Rate Us</span>
            </button>
            <span className="text-[11px] text-zinc-500 flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Share your dining or delivery experience</span>
            </span>
          </div>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveFilter('ALL')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer border ${
                activeFilter === 'ALL'
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
              }`}
            >
              All Reviews ({reviews.length})
            </button>
            <button
              onClick={() => setActiveFilter('5_STAR')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer border ${
                activeFilter === '5_STAR'
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
              }`}
            >
              5 Stars ⭐ ({count5Star})
            </button>
            <button
              onClick={() => setActiveFilter('VERIFIED')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer border ${
                activeFilter === 'VERIFIED'
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
              }`}
            >
              Verified Guests ✓
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by dish or reviewer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-[#D4AF37] focus:outline-none"
            />
          </div>
        </div>

        {/* Reviews Cards Grid */}
        {filteredReviews.length === 0 ? (
          <div className="text-center py-16 bg-zinc-950 border border-zinc-900 rounded-3xl text-zinc-400">
            <MessageSquare className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
            <p className="text-sm font-medium text-white mb-1">No reviews found</p>
            <p className="text-xs text-zinc-500">Try clearing your search query or select another filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-[#121212] rounded-2xl p-6 border border-zinc-800 hover:border-[#D4AF37]/50 transition duration-300 flex flex-col justify-between relative group shadow-lg"
              >
                <Quote className="absolute top-4 right-4 w-8 h-8 text-zinc-800/80 group-hover:text-[#D4AF37]/20 transition" />

                <div>
                  {/* Rating Stars & Verified Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1 text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>

                    {rev.verified && (
                      <span className="inline-flex items-center space-x-1 text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>Verified Diner</span>
                      </span>
                    )}
                  </div>

                  {/* Comment Text */}
                  <p className="text-zinc-300 text-xs sm:text-sm italic mb-6 leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>

                {/* Footer Info & Like Button */}
                <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white text-sm flex items-center space-x-1">
                      <span>{rev.author}</span>
                    </h4>
                    <div className="flex items-center space-x-2 text-[11px] text-zinc-500 mt-0.5">
                      <span className="text-[#D4AF37] font-medium">{rev.dishName}</span>
                      <span>•</span>
                      <span>{rev.date}</span>
                    </div>
                  </div>

                  {/* Like Button */}
                  <button
                    onClick={() => handleLikeReview(rev.id)}
                    className="flex items-center space-x-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-[#D4AF37] px-2.5 py-1.5 rounded-lg border border-zinc-800 text-xs transition cursor-pointer"
                    title="Mark review as helpful"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{rev.likes || 0}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Write a Review Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-[#121212] border border-[#D4AF37]/50 rounded-3xl shadow-2xl p-6 sm:p-8 text-white">
            <button
              onClick={() => setIsWriteModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-2 rounded-full bg-zinc-900 border border-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Leave Your Review</span>
            </div>

            <h3 className="font-serif text-2xl font-bold text-white mb-2">
              Rate Your Experience
            </h3>
            <p className="text-zinc-400 text-xs mb-6">
              Tell the Karachi community about your favorite dish from Hussain Foods!
            </p>

            <form onSubmit={handleAddReview} className="space-y-4">
              {/* Star Rating Picker */}
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-2">
                  Select Your Rating
                </label>
                <div className="flex items-center space-x-2 bg-zinc-900 p-3 rounded-xl border border-zinc-800 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className="p-1 transition transform hover:scale-125 focus:outline-none"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= newRating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-zinc-700 fill-zinc-900'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Author Name */}
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Usman Ali"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full bg-black border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              {/* Favorite Dish */}
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Dish Tried (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Crispy Breast Broast / Malai Boti Roll"
                  value={newDishName}
                  onChange={(e) => setNewDishName(e.target.value)}
                  className="w-full bg-black border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              {/* Comment */}
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Your Review Comment *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell us about the taste, portion, speed of delivery, or service..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full bg-black border border-zinc-800 rounded-xl p-3 text-xs text-white focus:border-[#D4AF37] focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gold-gradient hover:bg-gold-gradient-hover text-black font-bold py-3.5 rounded-xl text-xs sm:text-sm shadow-lg transition cursor-pointer"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
