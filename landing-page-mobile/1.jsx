import { FunctionComponent } from 'react';
import styles from './MobileVDefault.module.css';


const MobileVDefault: FunctionComponent = () => {
  	return (
    		<div className={styles.homeLoggedOutMobileV}>
      			<div className={styles.autolayoutFrame}>
        				<div className={styles.navbar}>
          					<div className={styles.navbarTop}>
            						<div className={styles.container}>
              							<div className={styles.logoWrapper}>
                								<div className={styles.logo}>
                  									<img className={styles.vectorGroupIcon} alt="" />
                								</div>
              							</div>
              							<div className={styles.navIcons}>
                								<div className={styles.navLinkicon}>
                  									<div className={styles.content}>
                    										<div className={styles.iconwrapper}>
                      											<img className={styles.icon} alt="" />
                    										</div>
                    										<div className={styles.borderBottom} />
                  									</div>
                								</div>
              							</div>
              							<img className={styles.mobileMenuWrapper} alt="" />
            						</div>
          					</div>
        				</div>
        				<div className={styles.sectionHero}>
          					<div className={styles.contentWrapper}>
            						<div className={styles.content2}>
              							<b className={styles.headingHero}>Affordable Grocery Delivery for NYC Residents</b>
              							<div className={styles.text}>Groupr makes it easy for you to buy the groceries you need using your EBT card, with no hidden fees and free delivery* directly to your building.</div>
              							<div className={styles.text}>We currently delivery to several pickup locations in NYC. Check out our pickup locations to find the one nearest to you!</div>
            						</div>
            						<div className={styles.buttonRow}>
              							<div className={styles.button}>
                								<div className={styles.button2}>
                  									<div className={styles.price}>Shop now</div>
                								</div>
              							</div>
              							<div className={styles.button3}>
                								<div className={styles.button4}>
                  									<div className={styles.price}>Sign up</div>
                								</div>
              							</div>
            						</div>
            						<div className={styles.required}>*Free delivery on orders over $75</div>
          					</div>
          					<img className={styles.illustrationIcon} alt="" />
          					<div className={styles.snapEbt}>
            						<div className={styles.ellipse} />
            						<b className={styles.snapebtAccepted}>SNAP/EBT<br/>accepted</b>
              							</div>
              							</div>
              							<div className={styles.sectionHowItWorks}>
                								<img className={styles.orangeSliceIcon} alt="" />
                								<b className={styles.heading}>How it works:</b>
                								<div className={styles.content3}>
                  									<div className={styles.row}>
                    										<div className={styles.howItWorksCard}>
                      											<div className={styles.subscribeParent}>
                        												<b className={styles.quote}>1. Place Your Order</b>
                        												<div className={styles.text6}>Select your SNAP-eligible groceries and choose a delivery day and time. We deliver on the 3rd, 6th, and 9th of every month.</div>
                      											</div>
                    										</div>
                    										<div className={styles.howItWorksCard}>
                      											<div className={styles.subscribeParent}>
                        												<b className={styles.quote}>2. Checkout Securely</b>
                        												<div className={styles.text6}>Pay with your EBT card or other payment method.</div>
                      											</div>
                    										</div>
                    										<div className={styles.howItWorksCard}>
                      											<div className={styles.subscribeParent}>
                        												<b className={styles.quote}>3. Pick up Your Order</b>
                        												<div className={styles.text6}>Groupr will deliver orders to a central pickup location at your building. Show your QR code to claim your groceries!</div>
                      											</div>
                    										</div>
                  									</div>
                								</div>
              							</div>
              							<div className={styles.sectionSnap}>
                								<img className={styles.breadIcon} alt="" />
                								<div className={styles.contentWrapper2}>
                  									<div className={styles.inputRadioGroup}>
                    										<b className={styles.quote}>Stretching your SNAP benefits each month can be tough. We’re here to help you make the most of your budget—all our items are SNAP-eligible, so everything you see is covered!</b>
                  									</div>
                  									<div className={styles.actions}>
                    										<div className={styles.button5}>
                      											<div className={styles.button6}>
                        												<div className={styles.itemName}>Sign up</div>
                      											</div>
                    										</div>
                    										<div className={styles.button7}>
                      											<div className={styles.button8}>
                        												<div className={styles.itemName}>Shop now</div>
                      											</div>
                    										</div>
                  									</div>
                								</div>
              							</div>
              							<div className={styles.sectionProducts}>
                								<div className={styles.categoryWrapper}>
                  									<img className={styles.arrowBackIosIcon} alt="" />
                  									<div className={styles.categoryCardRow}>
                    										<div className={styles.categoryRow}>
                      											<div className={styles.categoryCard}>
                        												<div className={styles.imageAndButtonWrapper}>
                          													<div className={styles.categoryIllustrations}>
                            														<img className={styles.frameIcon} alt="" />
                          													</div>
                        												</div>
                        												<div className={styles.contentBottom}>
                          													<div className={styles.header}>
                            														<div className={styles.itemName}>All</div>
                          													</div>
                        												</div>
                      											</div>
                      											<div className={styles.categoryCard}>
                        												<div className={styles.imageAndButtonWrapper}>
                          													<div className={styles.categoryIllustrations}>
                            														<img className={styles.frameIcon2} alt="" />
                          													</div>
                        												</div>
                        												<div className={styles.contentBottom}>
                          													<div className={styles.header}>
                            														<div className={styles.itemName}>Produce</div>
                          													</div>
                        												</div>
                      											</div>
                      											<div className={styles.categoryCard}>
                        												<div className={styles.imageAndButtonWrapper3}>
                          													<div className={styles.categoryIllustrations3}>
                            														<img className={styles.frameIcon2} alt="" />
                          													</div>
                        												</div>
                        												<div className={styles.contentBottom3}>
                          													<div className={styles.header}>
                            														<div className={styles.itemName}>{`Meat & Seafood`}</div>
                          													</div>
                        												</div>
                      											</div>
                      											<div className={styles.categoryCard}>
                        												<div className={styles.imageAndButtonWrapper3}>
                          													<div className={styles.categoryIllustrations3}>
                            														<img className={styles.frameIcon2} alt="" />
                          													</div>
                        												</div>
                        												<div className={styles.contentBottom3}>
                          													<div className={styles.header}>
                            														<div className={styles.itemName}>Pantry Staples</div>
                          													</div>
                        												</div>
                      											</div>
                      											<div className={styles.categoryCard}>
                        												<div className={styles.imageAndButtonWrapper3}>
                          													<div className={styles.categoryIllustrations3}>
                            														<img className={styles.frameIcon2} alt="" />
                          													</div>
                        												</div>
                        												<div className={styles.contentBottom3}>
                          													<div className={styles.header}>
                            														<div className={styles.itemName}>{`Dairy & Eggs`}</div>
                          													</div>
                        												</div>
                      											</div>
                      											<div className={styles.categoryCard}>
                        												<div className={styles.imageAndButtonWrapper3}>
                          													<div className={styles.categoryIllustrations3}>
                            														<img className={styles.frameIcon2} alt="" />
                          													</div>
                        												</div>
                        												<div className={styles.contentBottom3}>
                          													<div className={styles.header}>
                            														<div className={styles.itemName}>{`Cereals & Snacks`}</div>
                          													</div>
                        												</div>
                      											</div>
                      											<div className={styles.categoryCard}>
                        												<div className={styles.imageAndButtonWrapper3}>
                          													<div className={styles.categoryIllustrations3}>
                            														<img className={styles.frameIcon2} alt="" />
                          													</div>
                        												</div>
                        												<div className={styles.contentBottom3}>
                          													<div className={styles.header}>
                            														<div className={styles.itemName}>{`Breads & Bakery`}</div>
                          													</div>
                        												</div>
                      											</div>
                      											<div className={styles.categoryCard}>
                        												<div className={styles.imageAndButtonWrapper3}>
                          													<div className={styles.categoryIllustrations}>
                            														<img className={styles.frameIcon2} alt="" />
                          													</div>
                        												</div>
                        												<div className={styles.contentBottom3}>
                          													<div className={styles.header}>
                            														<div className={styles.itemName}>Beverages</div>
                          													</div>
                        												</div>
                      											</div>
                    										</div>
                  									</div>
                  									<img className={styles.arrowForwardIosIcon} alt="" />
                								</div>
                								<div className={styles.title}>
                  									<div className={styles.content8}>
                    										<b className={styles.heading5}>Featured products</b>
                    										<div className={styles.button9}>Shop the full store</div>
                  									</div>
                								</div>
                								<div className={styles.content9}>
                  									<div className={styles.row2}>
                    										<div className={styles.productCard}>
                      											<div className={styles.imageWrapper}>
                        												<img className={styles.imageIcon} alt="" />
                        												<div className={styles.addToCartButtonclosed}>
                          													<img className={styles.icon} alt="" />
                        												</div>
                      											</div>
                      											<div className={styles.contentBottom9}>
                        												<div className={styles.columnTwo}>$50 Assortment Bag</div>
                        												<div className={styles.details}>
                          													<div className={styles.price}>$50.00</div>
                          													<div className={styles.description}>9 items</div>
                        												</div>
                      											</div>
                    										</div>
                    										<div className={styles.productCard}>
                      											<div className={styles.imageWrapper}>
                        												<img className={styles.imageIcon} alt="" />
                        												<div className={styles.addToCartButtonclosed}>
                          													<img className={styles.icon} alt="" />
                        												</div>
                      											</div>
                      											<div className={styles.contentBottom9}>
                        												<div className={styles.columnTwo}>$75 Assortment Bag</div>
                        												<div className={styles.details}>
                          													<div className={styles.price}>$75.00</div>
                          													<div className={styles.description}>14 items</div>
                        												</div>
                      											</div>
                    										</div>
                    										<div className={styles.productCard}>
                      											<div className={styles.imageWrapper}>
                        												<img className={styles.imageIcon} alt="" />
                        												<div className={styles.addToCartButtonclosed}>
                          													<img className={styles.icon} alt="" />
                        												</div>
                      											</div>
                      											<div className={styles.contentBottom9}>
                        												<div className={styles.columnTwo}>$100 Assortment Bag</div>
                        												<div className={styles.details}>
                          													<div className={styles.price}>$100.00</div>
                          													<div className={styles.description}>18 items</div>
                        												</div>
                      											</div>
                    										</div>
                  									</div>
                  									<div className={styles.title2}>
                    										<div className={styles.content10}>
                      											<div className={styles.heading6}>Produce</div>
                      											<div className={styles.button10}>View All</div>
                    										</div>
                  									</div>
                  									<div className={styles.row3}>
                    										<div className={styles.productCard}>
                      											<div className={styles.imageWrapper}>
                        												<img className={styles.imageIcon} alt="" />
                        												<div className={styles.addToCartButtonclosed}>
                          													<img className={styles.icon} alt="" />
                        												</div>
                      											</div>
                      											<div className={styles.contentBottom9}>
                        												<div className={styles.columnTwo}>Organic apples item name</div>
                        												<div className={styles.details4}>
                          													<div className={styles.price}>$3</div>
                          													<div className={styles.description4}>Bag</div>
                        												</div>
                      											</div>
                    										</div>
                    										<div className={styles.productCard}>
                      											<div className={styles.imageWrapper}>
                        												<img className={styles.imageIcon} alt="" />
                        												<div className={styles.addToCartButtonclosed}>
                          													<img className={styles.icon} alt="" />
                        												</div>
                      											</div>
                      											<div className={styles.contentBottom9}>
                        												<div className={styles.columnTwo}>Organic apples item name</div>
                        												<div className={styles.details4}>
                          													<div className={styles.price}>$3</div>
                          													<div className={styles.description4}>Bag</div>
                        												</div>
                      											</div>
                    										</div>
                    										<div className={styles.productCard}>
                      											<div className={styles.imageWrapper}>
                        												<img className={styles.imageIcon} alt="" />
                        												<div className={styles.addToCartButtonclosed}>
                          													<img className={styles.icon} alt="" />
                        												</div>
                      											</div>
                      											<div className={styles.contentBottom9}>
                        												<div className={styles.columnTwo}>Organic apples item name</div>
                        												<div className={styles.details4}>
                          													<div className={styles.price}>$3</div>
                          													<div className={styles.description4}>Bag</div>
                        												</div>
                      											</div>
                    										</div>
                    										<div className={styles.productCard}>
                      											<div className={styles.imageWrapper}>
                        												<img className={styles.imageIcon} alt="" />
                        												<div className={styles.addToCartButtonclosed}>
                          													<img className={styles.icon} alt="" />
                        												</div>
                      											</div>
                      											<div className={styles.contentBottom9}>
                        												<div className={styles.columnTwo}>Organic apples item name</div>
                        												<div className={styles.details4}>
                          													<div className={styles.price}>$3</div>
                          													<div className={styles.description4}>Bag</div>
                        												</div>
                      											</div>
                    										</div>
                  									</div>
                  									<div className={styles.title2}>
                    										<div className={styles.content10}>
                      											<div className={styles.heading6}>{`Meat & Seafood`}</div>
                      											<div className={styles.button10}>View All</div>
                    										</div>
                  									</div>
                  									<div className={styles.row3}>
                    										<div className={styles.productCard}>
                      											<div className={styles.imageWrapper}>
                        												<img className={styles.imageIcon} alt="" />
                        												<div className={styles.addToCartButtonclosed}>
                          													<img className={styles.icon} alt="" />
                        												</div>
                      											</div>
                      											<div className={styles.contentBottom9}>
                        												<div className={styles.columnTwo}>Organic apples item name</div>
                        												<div className={styles.details4}>
                          													<div className={styles.price}>$3</div>
                          													<div className={styles.description4}>Bag</div>
                        												</div>
                      											</div>
                    										</div>
                    										<div className={styles.productCard}>
                      											<div className={styles.imageWrapper}>
                        												<img className={styles.imageIcon} alt="" />
                        												<div className={styles.addToCartButtonclosed}>
                          													<img className={styles.icon} alt="" />
                        												</div>
                      											</div>
                      											<div className={styles.contentBottom9}>
                        												<div className={styles.columnTwo}>Organic apples item name</div>
                        												<div className={styles.details4}>
                          													<div className={styles.price}>$3</div>
                          													<div className={styles.description4}>Bag</div>
                        												</div>
                      											</div>
                    										</div>
                    										<div className={styles.productCard}>
                      											<div className={styles.imageWrapper}>
                        												<img className={styles.imageIcon} alt="" />
                        												<div className={styles.addToCartButtonclosed}>
                          													<img className={styles.icon} alt="" />
                        												</div>
                      											</div>
                      											<div className={styles.contentBottom9}>
                        												<div className={styles.columnTwo}>Organic apples item name</div>
                        												<div className={styles.details4}>
                          													<div className={styles.price}>$3</div>
                          													<div className={styles.description4}>Bag</div>
                        												</div>
                      											</div>
                    										</div>
                    										<div className={styles.productCard}>
                      											<div className={styles.imageWrapper}>
                        												<img className={styles.imageIcon} alt="" />
                        												<div className={styles.addToCartButtonclosed}>
                          													<img className={styles.icon} alt="" />
                        												</div>
                      											</div>
                      											<div className={styles.contentBottom9}>
                        												<div className={styles.columnTwo}>Organic apples item name</div>
                        												<div className={styles.details4}>
                          													<div className={styles.price}>$3</div>
                          													<div className={styles.description4}>Bag</div>
                        												</div>
                      											</div>
                    										</div>
                  									</div>
                								</div>
                								<div className={styles.button12}>
                  									<div className={styles.button13}>
                    										<div className={styles.itemName}>See the full store</div>
                  									</div>
                								</div>
              							</div>
              							<div className={styles.sectionBenefits}>
                								<div className={styles.content12}>
                  									<img className={styles.imageIcon12} alt="" />
                  									<div className={styles.text13}>
                    										<b className={styles.heading8}>Simpler Shopping, Designed for You</b>
                    										<div className={styles.subscribeParent}>
                      											<b className={styles.quote}>{`No extra costs. No surprise fees. `}</b>
                      											<div className={styles.text6}>Groupr provides free delivery on all orders over $75, saving you time and money every month. We keep costs low by delivering orders to multiple customers in your building at the same time.</div>
                    										</div>
                    										<div className={styles.subscribeParent}>
                      											<b className={styles.quote}>Secure checkout with EBT payment options</b>
                      											<div className={styles.text6}>Groupr provides safe and secure payment processing using your EBT card or other payment methods.</div>
                    										</div>
                  									</div>
                								</div>
              							</div>
              							<div className={styles.sectionTestimonial}>
                								<div className={styles.content15}>
                  									<img className={styles.imageIcon12} alt="" />
                  									<div className={styles.content16}>
                    										<div className={styles.stars}>
                      											<img className={styles.vectorIcon} alt="" />
                      											<img className={styles.vectorIcon} alt="" />
                      											<img className={styles.vectorIcon} alt="" />
                      											<img className={styles.vectorIcon} alt="" />
                      											<img className={styles.vectorIcon} alt="" />
                    										</div>
                    										<b className={styles.quote}>"Groupr has made grocery shopping so easy for me. I love being able to order online and have my groceries delivered right to my door!"</b>
                    										<div className={styles.avatarContent}>
                      											<div className={styles.text16}>Maria Lopez</div>
                      											<div className={styles.text17}>Resident, Bronx River Houses</div>
                    										</div>
                  									</div>
                								</div>
                								<img className={styles.carrotIcon} alt="" />
              							</div>
              							<div className={styles.sectionFaq}>
                								<div className={styles.container2}>
                  									<div className={styles.row}>
                    										<b className={styles.heading11}>FAQs</b>
                    										<div className={styles.text6}>Here are some common questions about ordering, delivery, and payment options.</div>
                  									</div>
                  									<div className={styles.faqItems}>
                    										<div className={styles.accordionItem}>
                      											<div className={styles.content17}>
                        												<div className={styles.question}>
                          													<div className={styles.text19}>How do I order?</div>
                            														<img className={styles.icon2} alt="" />
                            														</div>
                            														</div>
                            														</div>
                            														<div className={styles.accordionItem}>
                              															<div className={styles.content17}>
                                																<div className={styles.question}>
                                  																	<div className={styles.text19}>Where do you deliver?</div>
                                    																		<img className={styles.icon2} alt="" />
                                    																		</div>
                                    																		</div>
                                    																		</div>
                                    																		<div className={styles.accordionItem}>
                                      																			<div className={styles.content17}>
                                        																				<div className={styles.question}>
                                          																					<div className={styles.text19}>When do you deliver?</div>
                                            																						<img className={styles.icon2} alt="" />
                                            																						</div>
                                            																						</div>
                                            																						</div>
                                            																						<div className={styles.accordionItem}>
                                              																							<div className={styles.content17}>
                                                																								<div className={styles.question}>
                                                  																									<div className={styles.text19}>How can I pay?</div>
                                                    																										<img className={styles.icon2} alt="" />
                                                    																										</div>
                                                    																										</div>
                                                    																										</div>
                                                    																										<div className={styles.accordionItem}>
                                                      																											<div className={styles.content17}>
                                                        																												<div className={styles.question}>
                                                          																													<div className={styles.text19}>Are there any fees?</div>
                                                            																														<img className={styles.icon2} alt="" />
                                                            																														</div>
                                                            																														</div>
                                                            																														</div>
                                                            																														<div className={styles.accordionItem}>
                                                              																															<div className={styles.content17}>
                                                                																																<div className={styles.question}>
                                                                  																																	<div className={styles.text19}>What if I need help?</div>
                                                                    																																		<img className={styles.icon2} alt="" />
                                                                    																																		</div>
                                                                    																																		</div>
                                                                    																																		</div>
                                                                    																																		</div>
                                                                    																																		<div className={styles.content23}>
                                                                      																																			<div className={styles.content24}>
                                                                        																																				<b className={styles.quote}>Still have questions?</b>
                                                                          																																					<div className={styles.text25}>We're here to assist you!</div>
                                                                          																																					</div>
                                                                          																																					<div className={styles.button14}>
                                                                            																																						<div className={styles.button15}>
                                                                              																																							<div className={styles.itemName}>Contact</div>
                                                                            																																						</div>
                                                                          																																					</div>
                                                                          																																					</div>
                                                                          																																					</div>
                                                                          																																					</div>
                                                                          																																					<div className={styles.sectionContact}>
                                                                            																																						<div className={styles.sectionTitle2}>
                                                                              																																							<div className={styles.content25}>
                                                                                																																								<b className={styles.heading11}>Get in Touch</b>
                                                                                																																								<div className={styles.text27}>We're here to help with your grocery needs.</div>
                                                                                																																								</div>
                                                                              																																							</div>
                                                                              																																							<div className={styles.form}>
                                                                                																																								<div className={styles.required}>* required</div>
                                                                                																																								<div className={styles.inputs}>
                                                                                  																																									<div className={styles.inputField}>
                                                                                    																																										<div className={styles.text}>First Name *</div>
                                                                                    																																										<div className={styles.inputText}>
                                                                                      																																											<div className={styles.content26} />
                                                                                    																																										</div>
                                                                                  																																									</div>
                                                                                  																																									<div className={styles.inputField}>
                                                                                    																																										<div className={styles.text}>Last Name *</div>
                                                                                    																																										<div className={styles.inputText}>
                                                                                      																																											<div className={styles.content26} />
                                                                                    																																										</div>
                                                                                  																																									</div>
                                                                                																																								</div>
                                                                                																																								<div className={styles.inputs}>
                                                                                  																																									<div className={styles.inputField}>
                                                                                    																																										<div className={styles.text}>Email *</div>
                                                                                    																																										<div className={styles.inputText}>
                                                                                      																																											<div className={styles.content26} />
                                                                                    																																										</div>
                                                                                  																																									</div>
                                                                                  																																									<div className={styles.inputField}>
                                                                                    																																										<div className={styles.text}>Phone Number</div>
                                                                                    																																										<div className={styles.inputText}>
                                                                                      																																											<div className={styles.content26} />
                                                                                    																																										</div>
                                                                                  																																									</div>
                                                                                																																								</div>
                                                                                																																								<div className={styles.content10}>
                                                                                  																																									<div className={styles.text}>How can we assist? *</div>
                                                                                    																																										<div className={styles.inputRadioGroup}>
                                                                                      																																											<div className={styles.radios}>
                                                                                        																																												<div className={styles.inputRadio}>
                                                                                          																																													<div className={styles.selectionWrapper}>
                                                                                            																																														<img className={styles.icon} alt="" />
                                                                                            																																														<div className={styles.text17}>Order Help</div>
                                                                                          																																													</div>
                                                                                        																																												</div>
                                                                                        																																												<div className={styles.inputRadio}>
                                                                                          																																													<div className={styles.selectionWrapper}>
                                                                                            																																														<img className={styles.icon} alt="" />
                                                                                            																																														<div className={styles.text17}>Product Question</div>
                                                                                          																																													</div>
                                                                                        																																												</div>
                                                                                        																																												<div className={styles.inputRadio}>
                                                                                          																																													<div className={styles.selectionWrapper}>
                                                                                            																																														<img className={styles.icon} alt="" />
                                                                                            																																														<div className={styles.text17}>Delivery Issue</div>
                                                                                          																																													</div>
                                                                                        																																												</div>
                                                                                        																																												<div className={styles.inputRadio}>
                                                                                          																																													<div className={styles.selectionWrapper}>
                                                                                            																																														<img className={styles.icon} alt="" />
                                                                                            																																														<div className={styles.text17}>Feedback</div>
                                                                                          																																													</div>
                                                                                        																																												</div>
                                                                                        																																												<div className={styles.inputRadio}>
                                                                                          																																													<div className={styles.selectionWrapper}>
                                                                                            																																														<img className={styles.icon} alt="" />
                                                                                            																																														<div className={styles.text17}>Expand to my neighborhood!</div>
                                                                                          																																													</div>
                                                                                        																																												</div>
                                                                                        																																												<div className={styles.inputRadio}>
                                                                                          																																													<div className={styles.selectionWrapper}>
                                                                                            																																														<img className={styles.icon} alt="" />
                                                                                            																																														<div className={styles.text17}>Other</div>
                                                                                          																																													</div>
                                                                                        																																												</div>
                                                                                      																																											</div>
                                                                                    																																										</div>
                                                                                    																																										</div>
                                                                                    																																										<div className={styles.content10}>
                                                                                      																																											<div className={styles.text}>Message *</div>
                                                                                      																																											<div className={styles.inputText5}>
                                                                                        																																												<div className={styles.content30}>
                                                                                          																																													<div className={styles.placeholder}>Enter your message</div>
                                                                                        																																												</div>
                                                                                        																																												<img className={styles.multilineIcon} alt="" />
                                                                                      																																											</div>
                                                                                    																																										</div>
                                                                                    																																										<div className={styles.button16}>
                                                                                      																																											<div className={styles.button6}>
                                                                                        																																												<div className={styles.itemName}>Send</div>
                                                                                      																																											</div>
                                                                                    																																										</div>
                                                                                    																																										</div>
                                                                                    																																										</div>
                                                                                    																																										<div className={styles.sectionCta}>
                                                                                      																																											<img className={styles.foodBackgroundIcon} alt="" />
                                                                                      																																											<div className={styles.content31}>
                                                                                        																																												<div className={styles.row}>
                                                                                          																																													<b className={styles.heading11}>Get Your Groceries Delivered</b>
                                                                                          																																													<div className={styles.text27}>Join our community and enjoy convenient grocery delivery tailored for your needs and budget.</div>
                                                                                        																																												</div>
                                                                                        																																												<div className={styles.actions2}>
                                                                                          																																													<div className={styles.button5}>
                                                                                            																																														<div className={styles.button19}>
                                                                                              																																															<div className={styles.itemName}>Sign up</div>
                                                                                            																																														</div>
                                                                                          																																													</div>
                                                                                          																																													<div className={styles.button20}>
                                                                                            																																														<div className={styles.button21}>
                                                                                              																																															<div className={styles.itemName}>Shop now</div>
                                                                                            																																														</div>
                                                                                          																																													</div>
                                                                                        																																												</div>
                                                                                      																																											</div>
                                                                                    																																										</div>
                                                                                    																																										<div className={styles.footer}>
                                                                                      																																											<div className={styles.content33}>
                                                                                        																																												<div className={styles.links}>
                                                                                          																																													<div className={styles.column}>
                                                                                            																																														<div className={styles.logo2}>
                                                                                              																																															<img className={styles.vectorGroupIcon} alt="" />
                                                                                            																																														</div>
                                                                                          																																													</div>
                                                                                          																																													<div className={styles.footerLinks}>
                                                                                            																																														<div className={styles.column2}>
                                                                                              																																															<div className={styles.columnTwo}>Quick Links</div>
                                                                                              																																															<div className={styles.inputRadioGroup}>
                                                                                                																																																<div className={styles.link}>
                                                                                                  																																																	<div className={styles.linkEight}>Shop Now</div>
                                                                                                																																																</div>
                                                                                                																																																<div className={styles.link}>
                                                                                                  																																																	<div className={styles.linkEight}>How It Works</div>
                                                                                                																																																</div>
                                                                                                																																																<div className={styles.link}>
                                                                                                  																																																	<div className={styles.linkEight}>FAQs</div>
                                                                                                																																																</div>
                                                                                                																																																<div className={styles.link}>
                                                                                                  																																																	<div className={styles.linkEight}>Pickup Locations</div>
                                                                                                																																																</div>
                                                                                              																																															</div>
                                                                                            																																														</div>
                                                                                            																																														<div className={styles.column2}>
                                                                                              																																															<div className={styles.columnTwo}>Stay Connected</div>
                                                                                              																																															<div className={styles.inputRadioGroup}>
                                                                                                																																																<div className={styles.link}>
                                                                                                  																																																	<div className={styles.linkEight}>Sign Up</div>
                                                                                                																																																</div>
                                                                                                																																																<div className={styles.link}>
                                                                                                  																																																	<div className={styles.linkEight}>Contact Us</div>
                                                                                                																																																</div>
                                                                                                																																																<div className={styles.link}>
                                                                                                  																																																	<div className={styles.linkEight}>Customer Support</div>
                                                                                                																																																</div>
                                                                                                																																																<div className={styles.link}>
                                                                                                  																																																	<div className={styles.linkEight}>Refer a Friend</div>
                                                                                                																																																</div>
                                                                                              																																															</div>
                                                                                            																																														</div>
                                                                                          																																													</div>
                                                                                        																																												</div>
                                                                                        																																												<div className={styles.newsletter}>
                                                                                          																																													<div className={styles.subscribeParent}>
                                                                                            																																														<div className={styles.columnTwo}>Join</div>
                                                                                            																																														<div className={styles.text}>Join our newsletter for updates on products and special offers.</div>
                                                                                          																																													</div>
                                                                                          																																													<div className={styles.actions3}>
                                                                                            																																														<div className={styles.subscribeParent}>
                                                                                              																																															<div className={styles.inputField7}>
                                                                                                																																																<div className={styles.inputText6}>
                                                                                                  																																																	<div className={styles.logoWrapper}>
                                                                                                    																																																		<div className={styles.placeholder}>Enter your email</div>
                                                                                                  																																																	</div>
                                                                                                																																																</div>
                                                                                              																																															</div>
                                                                                              																																															<div className={styles.button16}>
                                                                                                																																																<div className={styles.button23}>
                                                                                                  																																																	<div className={styles.itemName}>Subscribe</div>
                                                                                                																																																</div>
                                                                                              																																															</div>
                                                                                            																																														</div>
                                                                                            																																														<div className={styles.bySubscribingYou}>By subscribing, you agree to our Privacy Policy and consent to updates.</div>
                                                                                          																																													</div>
                                                                                        																																												</div>
                                                                                      																																											</div>
                                                                                      																																											<div className={styles.credits}>
                                                                                        																																												<div className={styles.divider} />
                                                                                        																																												<div className={styles.content33}>
                                                                                          																																													<div className={styles.credits2}>
                                                                                            																																														<div className={styles.relumeAllRights}>© 2025 Groupr. All rights reserved.</div>
                                                                                            																																														<div className={styles.privacyPolicy}>Privacy Policy</div>
                                                                                            																																														<div className={styles.privacyPolicy}>Terms of Service</div>
                                                                                            																																														<div className={styles.privacyPolicy}>Cookie Settings</div>
                                                                                          																																													</div>
                                                                                          																																													<div className={styles.socialLinks}>
                                                                                            																																														<img className={styles.socialIconIconFacebook} alt="" />
                                                                                            																																														<img className={styles.socialIconIconFacebook} alt="" />
                                                                                            																																														<img className={styles.socialIconIconFacebook} alt="" />
                                                                                            																																														<img className={styles.socialIconIconFacebook} alt="" />
                                                                                            																																														<img className={styles.socialIconIconFacebook} alt="" />
                                                                                          																																													</div>
                                                                                        																																												</div>
                                                                                      																																											</div>
                                                                                    																																										</div>
                                                                                    																																										</div>
                                                                                    																																										</div>);
                                                                                  																																									};
                                                                                  																																									
                                                                                  																																									export default MobileVDefault ;
                                                                                  																																									